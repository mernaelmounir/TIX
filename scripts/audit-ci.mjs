import { spawnSync } from 'node:child_process';

// Temporary exception: GHSA-fc5q-39xc-vjpf has no patched Picomatch release yet.
// Remove this entry as soon as upstream publishes a fixed version and the lockfile is updated.
const allowedAdvisories = new Map([
  [
    'https://github.com/advisories/ghsa-fc5q-39xc-vjpf',
    'Picomatch ReDoS through single-branch repeated extglobs (GHSA-fc5q-39xc-vjpf)',
  ],
]);

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(npmCommand, ['audit', '--audit-level=high', '--json'], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});

if (result.error) {
  console.error(`Could not run npm audit: ${result.error.message}`);
  process.exit(1);
}

let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  console.error('npm audit did not return valid JSON.');
  if (result.stderr) console.error(result.stderr.trim());
  process.exit(1);
}

if (report.error) {
  console.error(`npm audit failed: ${report.error.summary || report.error.message || 'unknown audit error'}`);
  process.exit(1);
}

const vulnerabilities = report.vulnerabilities;
const counts = report.metadata?.vulnerabilities;
if (!vulnerabilities || !counts) {
  console.error('npm audit output is missing vulnerability data.');
  process.exit(1);
}

console.log(
  `npm audit: ${counts.total} total ` +
    `(${counts.high} high, ${counts.critical} critical; ${counts.moderate} moderate).`,
);

const severityRank = { info: 0, low: 1, moderate: 2, high: 3, critical: 4 };
const highFindings = Object.entries(vulnerabilities).filter(
  ([, vulnerability]) => (severityRank[vulnerability.severity] ?? 0) >= severityRank.high,
);

function getHighAdvisories(packageName, visited = new Set()) {
  if (visited.has(packageName)) return [];
  visited.add(packageName);

  const vulnerability = vulnerabilities[packageName];
  if (!vulnerability) return [];

  const advisories = [];
  for (const via of vulnerability.via || []) {
    if (typeof via === 'string') {
      advisories.push(...getHighAdvisories(via, visited));
    } else if ((severityRank[via.severity] ?? 0) >= severityRank.high) {
      advisories.push({
        name: via.name || packageName,
        severity: via.severity,
        title: via.title || via.name || packageName,
        url: via.url?.toLowerCase(),
      });
    }
  }
  return advisories;
}

const allowed = new Map();
const rejected = [];
for (const [packageName, vulnerability] of highFindings) {
  const advisories = getHighAdvisories(packageName);
  if (!advisories.length) {
    rejected.push(`${packageName} (${vulnerability.severity}): no root advisory could be identified`);
    continue;
  }

  for (const advisory of advisories) {
    const description = `${packageName} (${vulnerability.severity}) via ${advisory.title}`;
    if (!allowedAdvisories.has(advisory.url)) {
      rejected.push(`${description} — ${advisory.url || 'missing advisory URL'}`);
    } else {
      const packages = allowed.get(advisory.url) || new Set();
      packages.add(packageName);
      allowed.set(advisory.url, packages);
    }
  }
}

if (rejected.length) {
  console.error('Blocking High/Critical advisories found:');
  for (const finding of rejected) console.error(`- ${finding}`);
  process.exit(1);
}

if (result.status !== 0 && highFindings.length === 0) {
  console.error(`npm audit exited with status ${result.status} without an allowlisted High/Critical finding.`);
  if (result.stderr) console.error(result.stderr.trim());
  process.exit(1);
}

for (const [url, packages] of allowed) {
  const label = allowedAdvisories.get(url);
  console.warn(`TEMPORARY SECURITY EXCEPTION: ${label}. Affected packages: ${[...packages].sort().join(', ')}.`);
  console.warn(`Upstream patch is not yet available; remove this exception after updating the lockfile: ${url}`);
}

if (!allowed.size) {
  console.log('No High/Critical npm audit findings.');
}
