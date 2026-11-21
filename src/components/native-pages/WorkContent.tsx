/* eslint-disable */
// @ts-nocheck
'use client';

import { useLocale, useTranslations } from 'next-intl';

export function WorkContent() {
  const t = useTranslations('WorkPage');
  const copy = useTranslations('RevisionCopy');
  const locale = useLocale();
  return (
    <>

  

  <main id="main-content">

    
    <section className="work-hero" aria-label="Work portfolio hero">

      <div className="work-hero__bg" aria-hidden="true">
        <img
          src="/assets/images/Gradient.webp"
          alt=""
          className="work-hero__bg-img"
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high" />
      </div>
      <div className="work-hero__grain" aria-hidden="true"></div>

      <div className="work-hero__inner">
        <div className="work-hero__copy">
          <h1 className="work-hero__title">{t('title')}</h1>
          <p className="work-hero__sub">{t('subtitle')}</p>
          <div className="work-hero__actions">
            <span className="work-hero__pill">
              {t('projectCount')}
            </span>
          </div>
        </div>

        <div className="work-hero__bento">
          <img
            src="/assets/images/Images%20Container.webp"
            alt=" TIX campaign photography collage"
            className="work-hero__bento-img"
            width="1400"
            height="900"
            loading="eager"
            fetchPriority="high" />
        </div>
      </div>

      
      <div className="work-ticker" aria-hidden="true">
        <div className="marquee">
          <div className="marquee__track">
            <span className="marquee__item">EVENT PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">COMMERCIAL PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">PRODUCT PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">WEDDING PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">LANDSCAPE PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">BRANDING PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">PORTRAIT PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">EVENT PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">COMMERCIAL PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">PRODUCT PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">WEDDING PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">LANDSCAPE PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">BRANDING PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
            <span className="marquee__item">PORTRAIT PHOTOGRAPHY <span className="marquee__sep">✦</span></span>
          </div>
        </div>
      </div>

    </section>

    
    <section className="work-gallery" aria-label={t('gallery')} id="work-categories">
      <div className="work-gallery__glow" aria-hidden="true"></div>

      <div className="work-gallery__inner">

        <div className="work-gallery__filter-wrap">
          <button type="button" className="work-gallery__filter" id="work-filter-btn" aria-expanded="false"
            aria-controls="work-filter-menu">
            {t('filter')}
            <span className="work-gallery__filter-chevron" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          <ul className="work-gallery__menu" id="work-filter-menu" role="listbox" hidden>
            <li><a href="#wg-fashion" data-jump="fashion">{t('fashion')}</a></li><li><a href="#wg-realestate" data-jump="realestate">{t('realestate')}</a></li><li><a href="#wg-events" data-jump="events">{t('events')}</a></li><li><a href="#wg-food" data-jump="food">{t('food')}</a></li><li><a href="#wg-beauty" data-jump="beauty">{t('beauty')}</a></li><li><a href="#wg-jewelry" data-jump="jewelry">{t('jewelry')}</a></li>
          </ul>
        </div>
        
        <div
          className="work-gallery__category-track"
          data-category-track
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          role="region"
          aria-label={copy('scrollCategories')}
          tabIndex={0}
        >
        <article className="wg-cat is-open" data-category="fashion" id="wg-fashion">
          <header className="wg-cat__head wg-cat__head--start">
            <div className="wg-cat__brand">
              <span className="wg-arrow wg-arrow--first" aria-hidden="true">
                <svg className="wg-arrow__fallback" width="22" height="22" viewBox="0 0 24 24" fill="none"
                  aria-hidden="true">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="white" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </span>
              <span className="wg-cat__tix-text">TIX</span>
              <h2 className="wg-cat__title">{t('gallery')}</h2>
            </div>
            <div className="wg-cat__aside">
            <h3 className="wg-cat__name">{t('categories.fashion')}</h3>
              <button type="button" className="wg-arrow wg-arrow--second" aria-expanded="true"
                aria-controls="wg-panel-fashion">
                <svg className="wg-arrow__fallback" width="22" height="22" viewBox="0 0 24 24" fill="none"
                  aria-hidden="true">
                  <path d="M17 7L7 17M7 17H15M7 17V9" stroke="white" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </header>

          <div className="wg-panel" id="wg-panel-fashion" role="region" aria-label={t('categories.fashion')}>
            <div className="wg-panel__meta">
            <h4 className="wg-panel__eyebrow">{t('eyebrows.fashion')}</h4>
            <p className="wg-panel__desc">{t('descriptions.fashion')}</p>
            </div>
            <p className="wg-strip__hint" lang="en" dir="ltr">Scroll horizontally to explore</p>
            <div className="wg-strip" data-strip>
              <button type="button" className="wg-card is-active" data-label="STUDIO SESSIONS">
                <div className="wg-card__media"><img src="/assets/images/fashion1.webp" alt="Fashion editorial 01" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> STUDIO SESSIONS</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="MODEL CASTING">
                <div className="wg-card__media"><img src="/assets/images/fashion2.webp" alt="Fashion editorial 02" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> MODEL CASTING</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="PRODUCT STYLING">
                <div className="wg-card__media"><img src="/assets/images/fashion3.webp" alt="Fashion editorial 03" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> PRODUCT STYLING</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="CREATIVE DIRECTION">
                <div className="wg-card__media"><img src="/assets/images/fashion4.webp" alt="Fashion editorial 04" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> CREATIVE DIRECTION</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="FASHION PHOTOGRAPHY">
                <div className="wg-card__media"><img src="/assets/images/fashion%205.webp" alt="Fashion editorial 05" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> FASHION PHOTOGRAPHY</span>
                </span>
              </button>
            </div>
          </div>
        </article>

        <article className="wg-cat is-open" data-category="realestate" id="wg-realestate">
          <header className="wg-cat__head wg-cat__head--zig-right">
            <div className="wg-cat__aside">
            <h3 className="wg-cat__name">{t('categories.realestate')}</h3>
              <button type="button" className="wg-arrow wg-arrow--second" aria-expanded="true"
                aria-controls="wg-panel-realestate">
                <svg className="wg-arrow__fallback" width="22" height="22" viewBox="0 0 24 24" fill="none"
                  aria-hidden="true">
                  <path d="M17 7L7 17M7 17H15M7 17V9" stroke="white" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </header>

          <div className="wg-panel" id="wg-panel-realestate" role="region" aria-label={t('categories.realestate')}>
            <div className="wg-panel__meta">
            <h4 className="wg-panel__eyebrow">{t('eyebrows.realestate')}</h4>
            <p className="wg-panel__desc">{t('descriptions.realestate')}</p>
            </div>
            <p className="wg-strip__hint" lang="en" dir="ltr">Scroll horizontally to explore</p>
            <div className="wg-strip" data-strip>
              <button type="button" className="wg-card is-active" data-label="INTERIOR">
                <div className="wg-card__media"><img src="/assets/images/r1.webp" alt="Real estate 01" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> INTERIOR</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="EXTERIOR">
                <div className="wg-card__media"><img src="/assets/images/r5.webp" alt="Real estate 02" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> EXTERIOR</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="LIFESTYLE">
                <div className="wg-card__media"><img src="/assets/images/r2.webp" alt="Real estate 03" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> LIFESTYLE</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="CORPORATE">
                <div className="wg-card__media"><img src="/assets/images/r4.webp" alt="Real estate 04" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> CORPORATE</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="DETAIL">
                <div className="wg-card__media"><img src="/assets/images/r6.webp" alt="Real estate 05" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> DETAIL</span>
                </span>
              </button>
            </div>
          </div>
        </article>

        
        <article className="wg-cat is-open" data-category="events" id="wg-events">
          <header className="wg-cat__head wg-cat__head--zig-right">
            <div className="wg-cat__aside">
              <h3 className="wg-cat__name">{t('categories.events')}</h3>
              <button type="button" className="wg-arrow wg-arrow--second" aria-expanded="true"
                aria-controls="wg-panel-events">
                <svg className="wg-arrow__fallback" width="22" height="22" viewBox="0 0 24 24" fill="none"
                  aria-hidden="true">
                  <path d="M17 7L7 17M7 17H15M7 17V9" stroke="white" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </header>

          <div className="wg-panel" id="wg-panel-events" role="region" aria-label={t('categories.events')}>
            <div className="wg-panel__meta">
              <h4 className="wg-panel__eyebrow">{t('eyebrows.events')}</h4>
              <p className="wg-panel__desc">{t('descriptions.events')}</p>
            </div>
            <p className="wg-strip__hint" lang="en" dir="ltr">Scroll horizontally to explore</p>
            <div className="wg-strip" data-strip>
              <button type="button" className="wg-card is-active" data-label="LIVE STAGE">
                <div className="wg-card__media"><img src="/assets/images/sherien.webp" alt="Event 01" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> LIVE
                    STAGE</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="BACKSTAGE">
                <div className="wg-card__media"><img src="/assets/images/e1.webp" alt="Event 02" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> BACKSTAGE</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="CROWD">
                <div className="wg-card__media"><img src="/assets/images/e2.webp" alt="Event 03" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> CROWD</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="LIGHTING">
                <div className="wg-card__media"><img src="/assets/images/e3.webp" alt="Event 04" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> LIGHTING</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="AFTERMOVIE">
                <div className="wg-card__media"><img src="/assets/images/e4.webp" alt="Event 05" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> AFTERMOVIE</span>
                </span>
              </button>
            </div>
          </div>
        </article>

        
        <article className="wg-cat is-open" data-category="food" id="wg-food">
          <header className="wg-cat__head wg-cat__head--zig-right">
            <div className="wg-cat__aside">
              <h3 className="wg-cat__name">{t('categories.food')}</h3>
              <button type="button" className="wg-arrow wg-arrow--second" aria-expanded="true"
                aria-controls="wg-panel-food">
                <svg className="wg-arrow__fallback wg-arrow__fallback--flip" width="22" height="22" viewBox="0 0 24 24"
                  fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="white" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </header>

          <div className="wg-panel" id="wg-panel-food" role="region" aria-label={t('categories.food')}>
            <div className="wg-panel__meta">
              <h4 className="wg-panel__eyebrow">{t('eyebrows.food')}</h4>
              <p className="wg-panel__desc">{t('descriptions.food')}</p>
            </div>
            <p className="wg-strip__hint" lang="en" dir="ltr">Scroll horizontally to explore</p>
            <div className="wg-strip" data-strip>
              <button type="button" className="wg-card is-active" data-label="PLATING">
                <div className="wg-card__media"><img src="/assets/images/f1.webp" alt="Food 01" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> PLATING</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="BEVERAGE">
                <div className="wg-card__media"><img src="/assets/images/B.webp" alt="Food 02" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> BEVERAGE</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="EDITORIAL">
                <div className="wg-card__media"><img src="/assets/images/f3.webp" alt="Food 03" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> EDITORIAL</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="MENU">
                <div className="wg-card__media"><img src="/assets/images/f4.webp" alt="Food 04" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> MENU</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="CAMPAIGN">
                <div className="wg-card__media"><img src="/assets/images/f2.webp" alt="Food 05" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> CAMPAIGN</span>
                </span>
              </button>
            </div>
          </div>
        </article>

        
        <article className="wg-cat is-open" data-category="beauty" id="wg-beauty">
          <header className="wg-cat__head wg-cat__head--zig-right">
            <div className="wg-cat__aside">
              <h3 className="wg-cat__name">{t('categories.beauty')}</h3>
              <button type="button" className="wg-arrow wg-arrow--second" aria-expanded="true"
                aria-controls="wg-panel-beauty">
                <svg className="wg-arrow__fallback" width="22" height="22" viewBox="0 0 24 24" fill="none"
                  aria-hidden="true">
                  <path d="M17 7L7 17M7 17H15M7 17V9" stroke="white" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </header>

          <div className="wg-panel" id="wg-panel-beauty" role="region" aria-label={t('categories.beauty')}>
            <div className="wg-panel__meta">
              <h4 className="wg-panel__eyebrow">{t('eyebrows.beauty')}</h4>
              <p className="wg-panel__desc">{t('descriptions.beauty')}</p>
            </div>
            <p className="wg-strip__hint" lang="en" dir="ltr">Scroll horizontally to explore</p>
            <div className="wg-strip" data-strip>
              <button type="button" className="wg-card is-active" data-label="BOTTLE STILLS">
                <div className="wg-card__media"><img src="/assets/images/b1.webp" alt="Beauty 01" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> BOTTLE
                    STILLS</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="TEXTURE">
                <div className="wg-card__media"><img src="/assets/images/b2.webp" alt="Beauty 02" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> TEXTURE</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="CAMPAIGN">
                <div className="wg-card__media"><img src="/assets/images/b4.webp" alt="Beauty 03" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> CAMPAIGN</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="EDITORIAL">
                <div className="wg-card__media"><img src="/assets/images/b3.webp" alt="Beauty 04" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> EDITORIAL</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="BEAUTY FILM">
                <div className="wg-card__media"><img src="/assets/images/b5.webp" alt="Beauty 05" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> BEAUTY
                    FILM</span>
                </span>
              </button>
            </div>
          </div>
        </article>

        
        <article className="wg-cat is-open" data-category="jewelry" id="wg-jewelry">
          <header className="wg-cat__head wg-cat__head--zig-right">
            <div className="wg-cat__aside">
              <h3 className="wg-cat__name">{t('categories.jewelry')}</h3>
              <button type="button" className="wg-arrow wg-arrow--second" aria-expanded="true"
                aria-controls="wg-panel-jewelry">
                <svg className="wg-arrow__fallback wg-arrow__fallback--flip" width="22" height="22" viewBox="0 0 24 24"
                  fill="none" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="white" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </header>

          <div className="wg-panel" id="wg-panel-jewelry" role="region" aria-label={t('categories.jewelry')}>
            <div className="wg-panel__meta">
              <h4 className="wg-panel__eyebrow">{t('eyebrows.jewelry')}</h4>
              <p className="wg-panel__desc">{t('descriptions.jewelry')}</p>
            </div>
            <p className="wg-strip__hint" lang="en" dir="ltr">Scroll horizontally to explore</p>
            <div className="wg-strip" data-strip>
              <button type="button" className="wg-card is-active" data-label="FINE JEWELRY">
                <div className="wg-card__media"><img src="/assets/images/je1.webp" alt="Jewelry 01" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> FINE
                    JEWELRY</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="CAMPAIGN STILLS">
                <div className="wg-card__media"><img src="/assets/images/je4.webp" alt="Jewelry 02" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> CAMPAIGN
                    STILLS</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="WATCH DETAIL">
                <div className="wg-card__media"><img src="/assets/images/je2.webp" alt="Jewelry 03" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> WATCH
                    DETAIL</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="LOOKBOOK">
                <div className="wg-card__media"><img src="/assets/images/je5.webp" alt="Jewelry 04" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> LOOKBOOK</span>
                </span>
              </button>
              <button type="button" className="wg-card" data-label="LUXURY FILM">
                <div className="wg-card__media"><img src="/assets/images/je3.webp" alt="Jewelry 05" loading="lazy" /></div>
                <span className="wg-card__tag">
                  <span className="wg-card__tag-view">VIEW ALL <span className="wg-card__tag-go" aria-hidden="true">→</span></span>
                  <span className="wg-card__tag-label"><span className="wg-card__dot" aria-hidden="true">↗</span> LUXURY
                    FILM</span>
                </span>
              </button>
            </div>
          </div>
        </article>

        </div>
      </div>
    </section>

    
    <section className="work-lens" data-work-lens aria-label="Story frames">
      <div className="work-lens__sticky">
        <div className="image-grid-wrapper">
          <div className="image-grid" data-work-lens-track role="region"
            aria-label="Scroll-driven photo slideshow">
            <div>
              <img src="/assets/images/g1.webp" alt="Perfume campaign still" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/e1.webp" alt="Fashion editorial portrait" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/jw.webp" alt="Jewelry campaign portrait" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/mainw.webp" alt="Luxury watch product still" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/g.webp" alt="Fashion campaign visual" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/f1.webp" alt="Beauty campaign visual" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/w.webp" alt="Editorial fashion frame" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/e.webp" alt="Production still" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/r1.webp" alt="Perfume campaign still" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/mode.webp" alt="Fashion editorial portrait" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/je3.webp" alt="Jewelry campaign portrait" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/r2.webp" alt="Luxury watch product still" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/mod.webp" alt="Fashion campaign visual" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/lilac.webp" alt="Beauty campaign visual" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/j5.webp" alt="Editorial fashion frame" loading="lazy" draggable="false" />
            </div>
            <div>
              <img src="/assets/images/f3.webp" alt="Production still" loading="lazy" draggable="false" />
            </div>
          </div>
        </div>

        <div className="work-lens__copy">
          <h2 className="work-lens__title">{t('story')}</h2>
          <p className="work-lens__sub">
            From fashion editorials to branded experiences<br />
            and cinematic production.
          </p>
        </div>
      </div>
    </section>

  </main>

  

  
  

    </>
  );
}
