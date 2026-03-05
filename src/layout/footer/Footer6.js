import Link from "next/link";

const Footer6 = ({ dark }) => {
  return (
    <footer className="main-footer footer-six pt-80">
      <div className="container">
        <div className="row gap-80 justify-content-between">
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="footer-widget newsletter-widget wow fadeInUp delay-0-2s">
              <div className="footer-logo mb-20">
                <Link href="/">
                  <img
                    src={
                      dark
                        ? "/assets/images/logos/logo-and-text.png"
                        : "/assets/images/logos/logo-and-text.png"
                    }
                    alt="Logo"
                    title="Logo"
                    width="1000"
                    height="224"
                  />
                </Link>
              </div>
              <div className="text mb-25">
                Ut enim ad minima veniam nostrum exercitationem ullam corporise
              </div>
              <form className="footer-newsletter" action="#">
                <input type="email" placeholder="Email Address" required />
                <button type="submit">
                  <i className="fas fa-long-arrow-right" />
                </button>
              </form>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-3 col-6">
            <div className="footer-widget footer-links wow fadeInUp delay-0-3s">
              <h5 className="footer-title">Products</h5>
              <div className="footer-widget widget_nav_menu">
                <ul className="list-style-two">
                  <li>
                    <a href="#">Spectra</a>
                  </li>
                  <li>
                    <a href="#">MemberPress</a>
                  </li>
                  <li>
                    <a href="#">WPforms</a>
                  </li>
                  <li>
                    <a href="#">AIOSEO</a>
                  </li>
                  <li>
                    <a href="#">Wordfence</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-3 col-6">
            <div className="footer-widget footer-links wow fadeInUp delay-0-4s">
              <h5 className="footer-title">Resources</h5>
              <div className="footer-widget widget_nav_menu">
                <ul className="list-style-two">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">My account</a>
                  </li>
                  <li>
                    <a href="#">Themes</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Checkout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-sm-6">
            <div className="footer-widget footer-links wow fadeInUp delay-0-5s">
              <h5 className="footer-title">Supports</h5>
              <div className="footer-widget widget_nav_menu">
                <ul className="list-style-two">
                  <li>
                    <a href="#">Terms of Services</a>
                  </li>
                  <li>
                    <a href="#">Support Ticket</a>
                  </li>
                  <li>
                    <a href="#">Refund Policy</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Video Tutorials</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="footer-widget footer-info wow fadeInUp delay-0-6s">
              <h5 className="footer-title">Contact</h5>
              <ul className="list-style-two">
                <li>
                  <i className="fas fa-map-marker-alt" />{" "}
                  <span>Baird House, 15-17 St Cross StLondon EC1N 8UW</span>
                </li>
                <li>
                  <i className="fas fa-envelope" />{" "}
                  <a href="mailto:support@gmail.com">support@gmail.com</a>
                </li>
                <li>
                  <i className="fas fa-phone" />{" "}
                  <a href="callto:+59898488759">+59898488759</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright-area rel mt-25 pt-35 pb-25">
          <div className="row">
            <div className="col-lg-6">
              <div className="footer-copyright-text wow fadeInUp delay-0-2s">
                <p>
                  Copyright @2023, <Link href="/">Ygency</Link> All Rights
                  Reserved
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer-bottom-social text-lg-end wow fadeInRight delay-0-2s">
                <div className="social-style-two">
                  <a href="https://www.facebook.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="https://www.instagram.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Scroll Top Button */}
          <button className="scroll-top scroll-to-target" data-target="html">
            <span className="fas fa-chevron-double-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer6;
