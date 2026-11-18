/* eslint-disable */
// @ts-nocheck
'use client';

import { useLocale, useTranslations } from 'next-intl';

export function ServicesContent() {
  const t = useTranslations('ServicesPage');
  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <>

  

  
  <main id="main-content">
    <section className="svchero" id="svchero" aria-label="Services hero">
      <div className="svchero__glow-bg" aria-hidden="true"></div>

      <div className="container svchero__container" lang={locale} dir={direction}>
        
        <div className="svchero__title-wrap svchero__title-wrap--top" data-reveal="left">
          <h1 className="svchero__main-text" lang={locale} dir={direction}>{t('hero')}</h1>
        </div>

        
        <div className="svchero__stage" id="svchero-stage" data-reveal="scale">
          <div className="svchero__basket-wrap">
            <img src="../assets/images/basket-clean.webp" alt="What's inside the studio - wire basket containing services: Marketing, Graphic Design, Production, Website Development, Photography, UI/UX, Social Media Management" className="svchero__basket-img" />

            
            <div className="svchero__chevron-item svchero__chevron-item--left" aria-hidden="true">
              <img src="../assets/images/chevron-left-final.webp" alt="" className="svchero__chevron-img" />
            </div>

            
            <div className="svchero__chevron-item svchero__chevron-item--right" aria-hidden="true">
              <img src="../assets/images/chevron-right-final.webp" alt="" className="svchero__chevron-img" />
            </div>
          </div>
        </div>

        
        <div className="svchero__title-wrap svchero__title-wrap--bottom" data-reveal="right">
          <h2 className="svchero__main-text svchero__main-text--right" lang={locale} dir={direction}>{t('studio')}</h2>
        </div>
      </div>
    </section>

    
    <section className="svc-calls" id="creativity-calls" aria-label={t('calls')}>
      
      <div className="svc-calls__aura" aria-hidden="true"></div>

      <div className="svc-calls__container">
        
        <div className="svc-calls__button-wrap" data-reveal="fade">
          <div className="svc-calls__button-card">
            <span className="svc-calls__button-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M12 4v15m-6-6 6 6 6-6" />
              </svg>
            </span>
            <p className="svc-calls__button-copy" lang={locale} dir={direction}>{t('callsIntro')}</p>
          </div>
        </div>

        
        <div className="svc-calls__stage-grid">
          
          <div className="svc-calls__side svc-calls__side--left" data-reveal="left">
            <h2 className="svc-calls__heading svc-calls__heading--left">
              <span>{t('creativity')}</span>
              <span>{t('callsWord')}</span>
            </h2>
          </div>

          
          <div className="svc-calls__phone-stage" data-reveal="scale">
            <div className="svc-calls__phone-wrapper">
              <img src="../assets/images/phone.webp" alt={t('phoneAlt')} className="svc-calls__phone-img" />
            </div>
          </div>

          
          <div className="svc-calls__side svc-calls__side--right" data-reveal="right">
            <h2 className="svc-calls__heading svc-calls__heading--right">
              <span>{t('we')}</span>
              <span>{t('answer')}</span>
            </h2>
          </div>
        </div>
      </div>
    </section>

    
    <section className="svc-folders" id="services-folders" data-folder-stack aria-label="Services Stacking Folders">
      <div className="container svc-folders__container">

        
        <article className="folder-card folder-card--1" style={{"--stack-index": "1"}}>
          
          <div className="folder-card__tab-bar">
            <div className="folder-card__tab folder-card__tab--left">
              <span className="folder-card__tab-label">{t('audienceTitle')}</span>
            </div>
          </div>
          
          <div className="folder-card__body">
            <div className="folder-card__grid">
              
              <div className="folder-card__col folder-card__col--pills">
                <div className="folder-card__pills-list">
                  <span className="folder-card__pill">{t('socialManagement')}</span><span className="folder-card__pill">{t('contentCreation')}</span><span className="folder-card__pill">{t('performanceMarketing')}</span><span className="folder-card__pill">{t('mediaBuying')}</span><span className="folder-card__pill">{t('influencerMarketing')}</span><span className="folder-card__pill">{t('creativeCampaigns')}</span><span className="folder-card__pill">{t('seo')}</span><span className="folder-card__pill">{t('marketAnalysis')}</span>
                </div>
              </div>

              
              <div className="folder-card__col folder-card__col--content">
                <div className="folder-card__media-wrap folder-card__media-wrap--chess">
                  <img src="../assets/images/Chess.webp" alt="Strategic chess pieces" className="folder-card__media-img folder-card__media-img--chess" />
                </div>
                <p className="folder-card__desc">
                  {t('audienceDescription')}
                </p>
              </div>
            </div>
          </div>
        </article>

        
        <article className="folder-card folder-card--2" style={{"--stack-index": "2"}}>
          
          <div className="folder-card__tab-bar">
            <div className="folder-card__tab folder-card__tab--middle">
              <span className="folder-card__tab-label">{t('motionTitle')}</span>
            </div>
          </div>
          
          <div className="folder-card__body">
            <div className="folder-card__grid">
              
              <div className="folder-card__col folder-card__col--pills">
                <div className="folder-card__pills-list">
                  <span className="folder-card__pill">{t('commercialProduction')}</span><span className="folder-card__pill">{t('brandShoots')}</span><span className="folder-card__pill">{t('productPhotography')}</span><span className="folder-card__pill">{t('motionGraphics')}</span><span className="folder-card__pill">{t('videoEditing')}</span><span className="folder-card__pill">{t('podcastProduction')}</span><span className="folder-card__pill">{t('eventCoverage')}</span><span className="folder-card__pill">{t('shortForm')}</span>
                </div>
              </div>

              
              <div className="folder-card__col folder-card__col--content">
                <p className="folder-card__desc folder-card__desc--top">
                  {t('motionDescription')}
                </p>
                <div className="folder-card__media-wrap folder-card__media-wrap--camera">
                  <img src="../assets/images/production.webp" alt="Production camera on tripod" className="folder-card__media-img folder-card__media-img--camera" />
                </div>
              </div>
            </div>
          </div>
        </article>

        
        <article className="folder-card folder-card--3" style={{"--stack-index": "3"}}>
          
          <div className="folder-card__tab-bar">
            <div className="folder-card__tab folder-card__tab--right">
              <span className="folder-card__tab-label">{t('visualTitle')}</span>
            </div>
          </div>
          
          <div className="folder-card__body">
            <div className="folder-card__grid">
              
              <div className="folder-card__col folder-card__col--pills">
                <div className="folder-card__pills-list">
                  <span className="folder-card__pill">{t('graphicDesignService')}</span><span className="folder-card__pill">{t('uiDesign')}</span><span className="folder-card__pill">{t('packaging')}</span><span className="folder-card__pill">{t('socialDesigns')}</span><span className="folder-card__pill">{t('presentation')}</span><span className="folder-card__pill">{t('guidelines')}</span><span className="folder-card__pill">{t('creativeConcepts')}</span><span className="folder-card__pill">{t('visualIdentity')}</span>
                </div>
              </div>

              
              <div className="folder-card__col folder-card__col--content">
                <div className="folder-card__media-wrap folder-card__media-wrap--visual">
                  <img src="../assets/images/visual.webp" alt="Brand visual system star & megaphone" className="folder-card__media-img folder-card__media-img--megaphone" />
                </div>
                <p className="folder-card__desc">
                  {t('visualDescription')}
                </p>
              </div>
            </div>
          </div>
        </article>

      </div>
    </section>

    <section className="gl-18" aria-label={t('gallery')}>
      <div className="gl-18__viewport">
        <div className="gl-18__track">
          <img src="../assets/images/mmm.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/ff.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/pr.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/ppp.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/mmo.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/g1.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/fashion1.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/e.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/sh2.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/m.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/f1.webp" alt="" loading="lazy" decoding="async" />
          <img src="../assets/images/faa.webp" alt="" loading="lazy" decoding="async" />
          <div className="gl-18__duplicate" aria-hidden="true">
            <img src="../assets/images/mmm.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/ff.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/pr.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/ppp.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/mmo.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/g1.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/fashion1.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/e.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/sh2.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/m.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/f1.webp" alt="" loading="lazy" decoding="async" />
            <img src="../assets/images/faa.webp" alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>

    </main>

    </>
  );
}
