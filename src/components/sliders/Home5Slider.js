import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from "@/src/components/icons/SimpleIcons";

const DEFAULT_SLIDES = [
  {
    bg: "/assets/images/slider/slide1.jpg",
    subtitle: "Marketing Agency",
    titleHtml: "<span>Perfect Marketing</span><br /> For Growth Your Dream Business",
    ratingLabel: "Quality Service",
    primary: { href: "/contact", text: "Get Started Now" },
    secondary: { href: "/projects", text: "How We Works" },
  },
  {
    bg: "/assets/images/slider/slide2.jpg",
    subtitle: "Marketing Agency",
    titleHtml: "<span>Perfect Marketing</span><br /> For Growth Your Dream Business",
    ratingLabel: "Quality Service",
    primary: { href: "/contact", text: "Get Started Now" },
    secondary: { href: "/projects", text: "How We Works" },
  },
];

const mainSliderSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  speed: 400,
  arrows: false,
  dots: false,
  focusOnSelect: true,
  autoplay: true,
  autoplaySpeed: 5000,
};

function ensureSlickStyles() {
  if (typeof document === "undefined") return;
  if (document.querySelector('link[data-slick-styles="true"]')) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/assets/css/slick.min.css";
  link.dataset.slickStyles = "true";
  document.head.appendChild(link);
}

function SlideMarkup({ slide, index = 0 }) {
  return (
    <div className="slider-item" style={{ backgroundImage: `url(${slide.bg})` }}>
      <div className="container">
        <div className="slide-content">
          {slide.subtitle && <span className="sub-title">{slide.subtitle}</span>}
          {slide.titleHtml && <h2 dangerouslySetInnerHTML={{ __html: slide.titleHtml }} />}
          <hr />
          <div className="ratting-btns">
            {slide.ratingLabel && (
              <div className="quyality-ratting">
                <span>{slide.ratingLabel}</span>
                <div className="ratting">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <StarIcon key={`star-${index}-${starIndex}`} size={13} />
                  ))}
                </div>
              </div>
            )}
            {slide.primary && (
              <Link id={`cta-slider-primary-${index}`} href={slide.primary.href} className="theme-btn style-two" data-cta="slider-primary" data-slide-index={index} title={slide.primary.text}>
                {slide.primary.text} <ArrowRightIcon className="ms-2" />
              </Link>
            )}
            {slide.secondary && (
              <Link id={`cta-slider-secondary-${index}`} className="read-more" href={slide.secondary.href} data-cta="slider-secondary" data-slide-index={index} title={slide.secondary.text}>
                {slide.secondary.text} <ArrowRightIcon className="ms-2" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home5Slider({ slides }) {
  const [SliderComponent, setSliderComponent] = useState(null);
  const sliderRef = useRef(null);
  const slidesData = useMemo(() => (slides && slides.length ? slides : DEFAULT_SLIDES), [slides]);

  useEffect(() => {
    if (typeof window === "undefined" || slidesData.length <= 1) return undefined;

    const mediaQuery = window.matchMedia("(min-width: 992px)");
    if (!mediaQuery.matches) return undefined;

    let cancelled = false;

    ensureSlickStyles();
    import("react-slick").then((mod) => {
      if (!cancelled) {
        setSliderComponent(() => mod.default || mod);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slidesData.length]);

  const goNext = () => sliderRef.current?.slickNext?.();
  const goPrev = () => sliderRef.current?.slickPrev?.();

  return (
    <section className="main-slider-area rel z-1">
      {SliderComponent ? (
        <>
          <SliderComponent ref={sliderRef} {...mainSliderSettings} className="main-slider">
            {slidesData.map((slide, index) => (
              <div key={`slide-${index}`}>
                <SlideMarkup slide={slide} index={index} />
              </div>
            ))}
          </SliderComponent>
          <div className="main-slider-controls">
            <div className="container">
              <div className="main-slider-arrows">
                <button className="main-slider-prev" onClick={goPrev} type="button">
                  <ArrowLeftIcon className="me-2" /> prev
                </button>
                <button className="main-slider-next" onClick={goNext} type="button">
                  next <ArrowRightIcon className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <SlideMarkup slide={slidesData[0]} index={0} />
      )}
    </section>
  );
}
