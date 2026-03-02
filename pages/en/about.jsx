import Layout from "@/src/layout/Layout";
import { NextSeo } from "next-seo";
import DefaultSEO from "@/next-seo.config";
import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";

const About = () => {
  const siteBase = (DefaultSEO?.canonical || "https://software-strategy.com/").replace(/\/$/, "");
  const canonical = `${siteBase}/en/about`;
  return (
    <Layout dark locale="en">
      <NextSeo
        title="About Us"
        description="Software Strategy is a technology-focused company helping growing businesses strengthen trust, visibility and digital performance."
        canonical={canonical}
        languageAlternates={[
          { hrefLang: "es", href: `${siteBase}/about` },
          { hrefLang: "en", href: `${siteBase}/en/about` },
          { hrefLang: "x-default", href: `${siteBase}/about` },
        ]}
        openGraph={{
          url: canonical,
          title: "About Us | Software Strategy",
          description: "Software Strategy is a technology-focused company helping growing businesses strengthen trust, visibility and digital performance.",
          locale: "en_US",
          type: "website",
        }}
      />
      <PageBanner pageName="About Us" homeLabel="Home" homeHref="/en" />

      <section className="why-choose-area pt-100 rpt-80 pb-80 rpb-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-5">
              <div className="row">
                <div className="col-xl-11">
                  <div className="why-choose-left-content mb-30 rmb-55 wow fadeInLeft delay-0-2s">
                    <div className="section-title mb-40">
                      <span className="sub-title mb-15">About the Company</span>
                      <h2>Professional websites and technology solutions for growing businesses</h2>
                    </div>
                    <h5>Who we are</h5>
                    <p>
                      Software Strategy is a technology-focused company specialized in professional website development and digital solutions
                      for businesses that need stronger trust, clearer positioning and better commercial outcomes.
                    </p>
                    <br />
                    <h5>How we work</h5>
                    <p>
                      We work directly, without inflated structures or unnecessary complexity. We first understand the business, then define the
                      right solution, and only then build it with a clear business focus.
                    </p>
                    <div className="mt-35 d-flex gap-3 flex-wrap">
                      <Link legacyBehavior href="/en/services/web-development">
                        <a className="theme-btn style-two" data-cta="about-services">
                          View website development <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                      <Link legacyBehavior href="/en/contact">
                        <a className="theme-btn" data-cta="about-contact">
                          Let’s talk <i className="fas fa-arrow-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7">
              <div className="row">
                <div className="col-md-6">
                  <div className="service-item wow fadeInRight delay-0-2s">
                    <div className="icon"><i className="fas fa-laptop-code" /></div>
                    <h5>
                      <Link legacyBehavior href="/en/services/web-development">
                        <a>Professional Website Development</a>
                      </Link>
                    </h5>
                    <p>Websites built to improve trust, communicate clearly and generate qualified inquiries.</p>
                  </div>
                  <div className="service-item wow fadeInRight delay-0-3s">
                    <div className="icon"><i className="fas fa-bullhorn" /></div>
                    <h5>
                      <Link legacyBehavior href="/en/services/digital-marketing">
                        <a>Digital Strategy</a>
                      </Link>
                    </h5>
                    <p>Practical strategy and execution to align channels, message and business priorities.</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="service-item mt-30 wow fadeInRight delay-0-4s">
                    <div className="icon"><i className="fas fa-search" /></div>
                    <h5>
                      <Link legacyBehavior href="/en/services/google-seo">
                        <a>Google Visibility</a>
                      </Link>
                    </h5>
                    <p>Improve how your business appears when potential clients are actively searching.</p>
                  </div>
                  <div className="service-item wow fadeInRight delay-0-5s">
                    <div className="icon"><i className="fas fa-cogs" /></div>
                    <h5>
                      <Link legacyBehavior href="/en/services/custom-software">
                        <a>Custom Technology Solutions</a>
                      </Link>
                    </h5>
                    <p>Tailored systems designed to simplify operations and support long-term growth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="who-we-are-area pt-20 rpt-0 pb-75 rpb-45 rel z-1">
        <div className="container container-1290">
          <div className="row gap-90">
            <div className="col-lg-4 col-md-6">
              <div className="why-choose-item style-two wow fadeInUp delay-0-2s">
                <div className="why-choose-header"><i className="fas fa-bullseye" /><h5>Clarity and positioning</h5></div>
                <p>We organize message, structure and digital presence so your business becomes easier to understand and easier to trust.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="why-choose-item style-two wow fadeInUp delay-0-3s">
                <div className="why-choose-header"><i className="fas fa-mobile-alt" /><h5>Practical decision-making</h5></div>
                <p>We define clear priorities so your digital investment moves forward without noise or unnecessary complexity.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="why-choose-item style-two wow fadeInUp delay-0-4s">
                <div className="why-choose-header"><i className="fas fa-lightbulb" /><h5>Direct collaboration</h5></div>
                <p>No unnecessary layers, no endless process. Just clear communication and business-focused execution.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
