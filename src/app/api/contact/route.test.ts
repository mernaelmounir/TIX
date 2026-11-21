import { describe, expect, it } from 'vitest';
import { GET, POST } from './route';

describe('contact API', () => {
  it('rejects unsupported methods', async () => {
    const response = GET();
    expect(response.status).toBe(405);
  });

  it('rejects invalid payloads before provider delivery', async () => {
    const response = await POST(new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'A', email: 'invalid', building: '' }),
      headers: { 'content-type': 'application/json' },
    }));
    expect(response.status).toBe(400);
  });
});
