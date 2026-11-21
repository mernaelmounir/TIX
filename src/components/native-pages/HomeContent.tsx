/* eslint-disable */
// @ts-nocheck
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { HomeBrandsSection } from './HomeBrandsSection';

const serviceRibbonItems = ['TIX', 'CREATIVE DIRECTION', 'STRATEGY', 'PRODUCTION', 'DIGITAL EXPERIENCE', 'LUXURY CAMPAIGNS'];
const clientRibbonItems = ['ZEN DIAMOND', 'KENZ GOLD', 'ALMASAT ELKHALIJ', 'GAWHARA', 'LUGANO', 'ZARA', 'H&M', 'LOCATION CAFE', 'SWEET DOOR', 'MAAMOL', 'DR IDOL', 'FUNDIK'];

function TrustRibbonGroup({ items, duplicate = false }) {
  return (
    <div className="marquee__group" lang="en" dir="ltr" aria-hidden={duplicate || undefined}>
      {items.map((item, index) => (
        <span className="marquee__item" key={`${item}-${index}`}>
          {item} <span className="marquee__sep" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
}

export function HomeContent() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const items = useTranslations('HomeLists');
  return (
    <>

  


  <main id="main-content">

    <section className="hero" aria-label={locale === 'ar' ? 'مقدمة الموقع' : 'Hero introduction'}>

      
      <div className="hero__bg" aria-hidden="true">
        <img src="/assets/images/HERO.webp" alt="" className="hero__bg-img" width="1920" height="1080" loading="eager"
          fetchPriority="high" />
        <div className="hero__bg-overlay"></div>
      </div>

      <div className="hero__grid-pattern" aria-hidden="true"></div>

      <div className="hero__inner">
        <div className="hero__content container">

          
          <div className="hero__logo-wrap">
            <img src="/assets/images/tixx.webp" alt="TIX Creative Agency" className="hero__logo-img" />
          </div>

          <h2 className="hero__headline-light">{t('heroLight')}</h2>
          <h2 className="hero__headline-bold">{t('heroBold')}</h2>

          <p className="hero__desc">{t('heroDescription')}</p>

          
          <div className="hero__stats-row">
            <div className="hero__stat-pill">{t('activeCampaigns')}</div>
            <div className="hero__stat-pill">{t('globalClients')}</div>
            <div className="hero__stat-pill">{t('projectsDelivered')}</div>
          </div>

          
          <div className="hero__actions">
            <Link href="/about" className="btn btn--crimson btn--lg">
              {t('enterStudio')}
            </Link>
          </div>

        </div>
      </div>


    </section>



    

  
  <section className="tix-frame-section observer-target">
    
    
    <div className="tix-tab-header-wrapper">
      <div className="tix-frame-tab">
        <h2>{t('explore')}</h2>
      </div>
    </div>

    
    <div className="tix-drape-bg">
      <div className="tix-strategy-headers">
        <span>{t('brandDirection')}</span>
        <span>{t('visualStrategy')}</span>
        <span>{t('audienceImpact')}</span>
      </div>

      <div className="tix-cards-container">
        
        <div className="tix-oval-card tix-card-edge delay-3 observer-target">
          <img src="/assets/images/events-card-oriented.webp" alt={t('events')} />
          <span className="tix-card-label">{t('events')}</span>
        </div>

        
        <div className="tix-oval-card tix-card-mid delay-2 observer-target">
          <img src="/assets/images/Perfumes.webp" alt={t('perfumes')} />
          <span className="tix-card-label">{t('perfumes')}</span>
        </div>

        
        <div className="tix-oval-card tix-card-center delay-1 observer-target">
          <img src="/assets/images/fashion-card-oriented.webp" alt={t('fashion')} />
          <span className="tix-card-label">{t('fashion')}</span>
        </div>

        
        <div className="tix-oval-card tix-card-mid delay-2 observer-target">
          <img src="/assets/images/jewelry.webp" alt={t('jewelry')} />
          <span className="tix-card-label">{t('jewelry')}</span>
        </div>

        
        <div className="tix-oval-card tix-card-edge delay-3 observer-target">
          <img src="/assets/images/food.webp" alt={t('food')} />
          <span className="tix-card-label">{t('food')}</span>
        </div>
      </div>
    </div>

  </section>


    <HomeBrandsSection />

    
    <section className="disrupt" data-disrupt-pin aria-labelledby="disrupt-heading">
      <div className="disrupt__sticky" data-disrupt-sticky>

        
        <div className="disrupt__bg" aria-hidden="true">
          <div className="disrupt__grad-wrap">
            <img src="/assets/images/grad.webp" alt="" className="disrupt__grad !mix-blend-lighten" width="1920" height="1080" loading="lazy" />
          </div>
        </div>

        
        <div className="disrupt__tix" aria-hidden="true">
          <img src="/assets/images/tixx.webp" alt="" className="disrupt__tix-img !filter-none" width="800" height="320" loading="lazy" />
        </div>

        
        <div className="disrupt__left">
          <h2 className="disrupt__tagline whitespace-pre-line max-[900px]:!whitespace-nowrap max-[900px]:!text-center" id="disrupt-heading" lang={locale} dir={direction}>
            {t('disrupt')}
          </h2>
          <img src="/assets/images/modelcrop.webp" alt="TIX creative campaign model" className="disrupt__girl max-[900px]:!hidden"
            width="720" height="960" loading="lazy" />
        </div>

        
        <div className="disrupt__right">
          <p className="disrupt__scroll-hint" aria-hidden="true">
            {locale === 'ar' ? 'مرّر أفقيًا للاستكشاف' : 'Scroll horizontally to explore'}
          </p>
          <div className="disrupt__viewport">
            <div className="disrupt__track" data-disrupt-track>

              <article className="disrupt__card">
                <span className="disrupt__num">01</span>
                <h3 className="disrupt__card-title">{t('marketing')}</h3>
                <p className="disrupt__card-desc">{t('marketingDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('marketing5')}</li>
                </ul>
              </article>

              <article className="disrupt__card">
                <span className="disrupt__num">02</span>
                <h3 className="disrupt__card-title">{t('socialMedia')}</h3>
                <p className="disrupt__card-desc">{t('socialDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('social5')}</li>
                </ul>
              </article>

              <article className="disrupt__card">
                <span className="disrupt__num">03</span>
                <h3 className="disrupt__card-title">{t('production')}</h3>
                <p className="disrupt__card-desc">{t('productionDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('production5')}</li>
                </ul>
              </article>

              <article className="disrupt__card">
                <span className="disrupt__num">04</span>
                <h3 className="disrupt__card-title">{t('graphicDesign')}</h3>
                <p className="disrupt__card-desc">{t('designDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('design5')}</li>
                </ul>
              </article>

              <article className="disrupt__card">
                <span className="disrupt__num">05</span>
                <h3 className="disrupt__card-title">{t('webDevelopment')}</h3>
                <p className="disrupt__card-desc">{t('webDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('web5')}</li>
                </ul>
              </article>

              <article className="disrupt__card">
                <span className="disrupt__num">06</span>
                <h3 className="disrupt__card-title">{t('uiux')}</h3>
                <p className="disrupt__card-desc">{t('uiuxDescription')}</p>
                <ul className="disrupt__list !gap-0">
                  <li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui1')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui2')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui3')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui4')}</li><li className="!rounded-none !border-l-0 !border-b !border-solid !border-[#610000] !bg-transparent !px-0 !py-[0.72rem]">{items('ui5')}</li>
                </ul>
              </article>

            </div>
          </div>
        </div>

        
        <div className="disrupt__outro !grid !grid-cols-4 !gap-1 sm:!gap-2" data-disrupt-outro role="group" aria-label={locale === 'ar' ? 'أبرز الخدمات الأربع' : 'Four service highlights'}>
          <article className="disrupt__tile">
            <img src="/assets/images/strategy.webp" alt="" className="disrupt__tile-img !grayscale contrast-[1.05]" width="1600" height="1067" loading="lazy" />
            <div className="disrupt__tile-copy">
              <h3 className="disrupt__tile-title">{t('strategyTile')}</h3>
              <p className="disrupt__tile-sub">{t('strategyTileDescription')}</p>
            </div>
          </article>
          <article className="disrupt__tile">
            <img src="/assets/images/media-production.webp" alt="" className="disrupt__tile-img !grayscale contrast-[1.05]" width="1600" height="2400" loading="lazy" />
            <div className="disrupt__tile-copy">
              <h3 className="disrupt__tile-title">{t('mediaTile')}</h3>
              <p className="disrupt__tile-sub">{t('mediaTileDescription')}</p>
            </div>
          </article>
          <article className="disrupt__tile">
            <img src="/assets/images/e.webp" alt="" className="disrupt__tile-img !grayscale contrast-[1.05]" width="1035" height="589" loading="lazy" />
            <div className="disrupt__tile-copy">
              <h3 className="disrupt__tile-title">{t('marketingTile')}</h3>
              <p className="disrupt__tile-sub">{t('marketingTileDescription')}</p>
            </div>
          </article>
          <article className="disrupt__tile">
            <img src="/assets/images/digital-presence.webp" alt="" className="disrupt__tile-img !grayscale contrast-[1.05]" width="1600" height="1064" loading="lazy" />
            <div className="disrupt__tile-copy">
              <h3 className="disrupt__tile-title">{t('digitalTile')}</h3>
              <p className="disrupt__tile-sub">{t('digitalTileDescription')}</p>
            </div>
          </article>
        </div>

        
        <div className="disrupt__cloud" aria-hidden="true"></div>
      </div>
    </section>


    
    <section className="trust-section" aria-labelledby="trust-heading">
      <div className="trust-section__inner">
        <div className="trust-section__ribbon trust-section__ribbon--light marquee" aria-hidden="true">
          <div className="marquee__track">
            <TrustRibbonGroup items={serviceRibbonItems} />
            <TrustRibbonGroup items={serviceRibbonItems} duplicate />
          </div>
        </div>

        <div className="trust-section__ribbon trust-section__ribbon--crimson marquee marquee--reverse" aria-hidden="true">
          <div className="marquee__track">
            <TrustRibbonGroup items={clientRibbonItems} />
            <TrustRibbonGroup items={clientRibbonItems} duplicate />
          </div>
        </div>

        <h2 className="trust-section__headline" id="trust-heading" lang="en" dir="ltr" aria-label={t('trust')}>
          <span className="trust-section__word trust-section__word--they">{t('they')}</span>
          <span className="trust-section__word trust-section__word--trusted">{t('trusted')}</span>
          <span className="trust-section__word trust-section__word--us">{t('us')}</span>
        </h2>

        <div className="trust-section__cta">
          <Link href="/work" className="btn btn--outline">{t('seeWork')}</Link>
        </div>
      </div>
    </section>

  </main>

  
  

  
  
  

    </>
  );
}
