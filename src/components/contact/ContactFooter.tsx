'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';

const socialLinks = [
  { label: 'TIX on Instagram', href: 'https://www.instagram.com/ajz_photographer?igsh=MXc1bDJ1aGNvOWFnZA==', icon: FaInstagram },
  { label: 'TIX on Facebook', href: 'https://www.facebook.com/', icon: FaFacebookF },
  { label: 'TIX on LinkedIn', href: 'https://www.linkedin.com/', icon: FaLinkedinIn },
  { label: 'TIX on WhatsApp', href: 'https://www.whatsapp.com/', icon: FaWhatsapp },
  { label: 'TIX on TikTok', href: 'https://www.tiktok.com/', icon: FaTiktok },
] as const;

const socialLabels = ['instagram', 'facebook', 'linkedin', 'whatsapp', 'tiktok'] as const;

function InfoLabel({ children, large = false }: { children: ReactNode; large?: boolean }) {
  return large
    ? <h3 className="contact-footer__title">{children}</h3>
    : <h3 className="contact-footer__label">{children}</h3>;
}

export function ContactFooter() {
  const t = useTranslations();
  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <section
      className="contact-footer"
      data-contact-footer
      dir={direction}
      aria-label={t('ContactPage.contactInformation')}
    >
      <div className="contact-footer__background" aria-hidden="true" />
      <div className="contact-footer__ambient" aria-hidden="true" />
      <div className="contact-footer__inner">
        <div className="contact-footer__panel" data-contact-panel aria-hidden="true" />

        <div className="contact-footer__headlines" dir={direction}>
          <h2 className="contact-footer__headline contact-footer__headline--first">
            {t('ContactPage.contactIntroFirst')}
          </h2>
          {' '}
          <h2 className="contact-footer__headline contact-footer__headline--second">
            {t('ContactPage.contactIntroSecond')}
          </h2>
        </div>

        <Image
          className="contact-footer__character"
          src="/assets/images/contact_boy.webp"
          alt={t('ContactPage.characterAlt')}
          width={832}
          height={833}
          priority
          data-contact-character
        />

        <div className="contact-footer__content" dir={direction}>
          <div className="contact-footer__details">
            <InfoLabel large>{t('ContactPage.contactUs')}</InfoLabel>
            <div className="contact-footer__group">
              <InfoLabel>{t('ContactPage.emailLabel')}</InfoLabel>
              <a className="contact-detail-pill" dir="ltr" href="mailto:tix@gmail.com">
                TIX@GMAIL.COM
              </a>
            </div>
            <div className="contact-footer__group">
              <InfoLabel>{t('ContactPage.branchesLabel')}</InfoLabel>
              <div className="contact-footer__branches">
                <span className="contact-detail-pill" dir="ltr">Alexandria, Elraml Station</span>
                <span className="contact-detail-pill" dir="ltr">Agami, Elbetash</span>
              </div>
            </div>
          </div>

          <div className="contact-footer__social">
            <InfoLabel>{t('ContactPage.followUs')}</InfoLabel>
            <div className="contact-footer__social-grid" dir="ltr">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`Accessibility.${socialLabels[index]}`)}
                  className="contact-footer__social-link"
                >
                  <social.icon aria-hidden="true" className="contact-footer__social-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-footer__legal">
          <span>{t('Footer.copyright')}</span>
          <nav className="contact-footer__legal-links" aria-label={t('ContactPage.legal')}>
            <Link href="/contact">{t('Footer.support')}</Link>
            <Link href="/terms-and-conditions">{t('Footer.terms')}</Link>
            <Link href="/privacy-policy">{t('Footer.privacy')}</Link>
          </nav>
        </div>
      </div>
    </section>
  );
}
