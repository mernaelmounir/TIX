import Image from 'next/image';
import { useTranslations } from 'next-intl';

type BrandPhoto = {
  src: string;
  alt: string;
};

type BrandEntry = {
  id: string;
  title: string;
  photos: [BrandPhoto, BrandPhoto, BrandPhoto];
};

const brandEntries: BrandEntry[] = [
  {
    id: 'kenz',
    title: 'KENZ',
    photos: [
      {
        src: '/assets/images/brands/kenz-main.webp',
        alt: 'KENZ jewelry campaign portrait featuring gold jewelry against a monochrome background.',
      },
      {
        src: '/assets/images/brands/kenz-detail.webp',
        alt: 'Close-up of a KENZ model wearing a gold ring and bracelets.',
      },
      {
        src: '/assets/images/brands/kenz-campaign.webp',
        alt: 'Side portrait from the KENZ jewelry campaign with layered necklaces and bracelets.',
      },
    ],
  },
  {
    id: 'zen-diamond',
    title: 'ZEN DIAMOND',
    photos: [
      {
        src: '/assets/images/brands/zen-diamond-products.webp',
        alt: 'ZEN Diamond display with several jeweled pieces arranged on dark stands.',
      },
      {
        src: '/assets/images/brands/zen-diamond-velvet.webp',
        alt: 'A jeweled piece arranged across dark velvet cases with gold trim.',
      },
      {
        src: '/assets/images/brands/zen-diamond-store.webp',
        alt: 'ZEN Diamond storefront with its illuminated sign above the entrance.',
      },
    ],
  },
  {
    id: 'artist-events',
    title: 'AMR DIAB / TAMER HOSNY',
    photos: [
      {
        src: '/assets/images/brands/artists-stage-amr.webp',
        alt: 'AMR DIAB live on a concert stage with purple lighting and the crowd in front.',
      },
      {
        src: '/assets/images/brands/artists-close-amr.webp',
        alt: 'AMR DIAB singing into a microphone under violet stage lights.',
      },
      {
        src: '/assets/images/brands/artists-close-tamer.webp',
        alt: 'TAMER HOSNY performing into a microphone beneath red stage lights.',
      },
    ],
  },
  {
    id: 'hm',
    title: 'H&M',
    photos: [
      {
        src: '/assets/images/brands/hm-event.webp',
        alt: 'A presenter at an H&M event in front of the H&M campaign display.',
      },
      {
        src: '/assets/images/brands/hm-storefront.webp',
        alt: 'H&M storefront with its red sign above the arched entrance.',
      },
      {
        src: '/assets/images/brands/hm-interior.webp',
        alt: 'H&M store interior with clothing displays and the H&M campaign mark.',
      },
    ],
  },
  {
    id: 'almasat-alkhalij',
    title: 'ALMASAT ALKHALIJ',
    photos: [
      {
        src: '/assets/images/brands/almasat-main.webp',
        alt: 'ALMASAT ALKHALIJ gold ring with a large turquoise stone and the supplied logo.',
      },
      {
        src: '/assets/images/brands/almasat-blue.webp',
        alt: 'ALMASAT ALKHALIJ gold rabbit ring with a blue stone and the supplied logo.',
      },
      {
        src: '/assets/images/brands/almasat-red.webp',
        alt: 'ALMASAT ALKHALIJ silver ring with a deep red stone and the supplied logo.',
      },
    ],
  },
];

export function HomeBrandsSection() {
  const t = useTranslations('RevisionCopy');

  return (
    <section
      className="home-brands"
      data-home-brands
      aria-label={t('brandShowcase')}
      aria-roledescription={t('brandCarousel')}
    >
      <p className="home-brands__scroll-hint" aria-hidden="true">
        {t('brandScrollHint')}
      </p>
      <div
        className="home-brands__viewport"
        data-home-brands-viewport
        role="region"
        aria-label={t('brandShowcase')}
        tabIndex={0}
      >
        <div className="home-brands__track" data-home-brands-track>
          {brandEntries.map((brand, index) => (
            <article
              className="home-brands__slide"
              data-brand-slide
              data-brand-index={index}
              key={brand.id}
              aria-labelledby={`home-brand-${brand.id}`}
              aria-roledescription={t('brandSlide')}
              lang="en"
              dir="ltr"
            >
              <div className="home-brands__collage">
                {brand.photos.map((photo, photoIndex) => {
                  const placement = ['large', 'upper', 'lower'][photoIndex];
                  return (
                    <figure
                      className={`home-brands__photo home-brands__photo--${placement}`}
                      data-brand-photo={placement}
                      key={photo.src}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 56vw, (max-width: 1000px) 42vw, 34vw"
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  );
                })}

                <div className="home-brands__brand-label">
                  <span className="home-brands__brand-count" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')} / {String(brandEntries.length).padStart(2, '0')}
                  </span>
                  <h2 className="home-brands__brand-name" id={`home-brand-${brand.id}`}>
                    {brand.title}
                  </h2>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
