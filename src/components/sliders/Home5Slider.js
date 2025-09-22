import { sliderProps } from "@/src/sliderProps";
import Link from "next/link";
import { Component } from "react";
import Slider from "react-slick";
export default class Home5Slider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  render() {
    const { slides } = this.props || {};
    return (
      <section className="main-slider-area rel z-1">
        <Slider ref={(c) => (this.slider = c)} {...sliderProps.mainSlider} className="main-slider">
          {(slides && slides.length ? slides : [
            {
              bg: "/assets/images/slider/slide1.jpg",
              subtitle: "Marketing Agency",
              titleHtml: '<span>Perfect Marketing</span><br /> For Growth Your Dream Business',
              ratingLabel: "Quality Service",
              primary: { href: "/contact", text: "Get Started Now" },
              secondary: { href: "/projects", text: "How We Works" },
            },
            {
              bg: "/assets/images/slider/slide2.jpg",
              subtitle: "Marketing Agency",
              titleHtml: '<span>Perfect Marketing</span><br /> For Growth Your Dream Business',
              ratingLabel: "Quality Service",
              primary: { href: "/contact", text: "Get Started Now" },
              secondary: { href: "/projects", text: "How We Works" },
            },
          ]).map((s, i) => (
            <div key={`slide-${i}`}>
              <div className="slider-item" style={{ backgroundImage: `url(${s.bg})` }}>
                <div className="container">
                  <div className="slide-content">
                    {s.subtitle && <span className="sub-title">{s.subtitle}</span>}
                    {s.titleHtml && <h2 dangerouslySetInnerHTML={{ __html: s.titleHtml }} />}
                    <hr />
                    <div className="ratting-btns">
                      {s.ratingLabel && (
                        <div className="quyality-ratting">
                          <span>{s.ratingLabel}</span>
                          <div className="ratting">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      )}
                      {s.primary && (
                        <Link id={`cta-slider-primary-${i}`} href={s.primary.href} className="theme-btn style-two" data-cta="slider-primary" data-slide-index={i}>
                          {s.primary.text} <i className="far fa-arrow-right" />
                        </Link>
                      )}
                      {s.secondary && (
                        <Link id={`cta-slider-secondary-${i}`} className="read-more" href={s.secondary.href} data-cta="slider-secondary" data-slide-index={i}>
                          {s.secondary.text} <i className="far fa-arrow-right" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="main-slider-controls">
          <div className="container">
            <div className="main-slider-arrows">
              <button className="main-slider-prev" onClick={this.previous}>
                <i className="fal fa-long-arrow-left" /> prev
              </button>
              <button className="main-slider-next" onClick={this.next}>
                next <i className="fal fa-long-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
