import { Fragment, useState } from "react";
import MobileSlideMenu from "@/src/layout/header/MobileSlideMenu";
import { FacebookIcon, InstagramIcon } from "@/src/components/icons/SimpleIcons";
const SideBar = ({ locale = "es" }) => {
  const isEn = locale === "en";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const closeSidebar = () => {
    document.querySelector("body")?.classList.remove("side-content-visible");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("submitting");
    try {
      const endpoint = process.env.NEXT_PUBLIC_APPOINTMENT_ENDPOINT;
      if (!endpoint) {
        throw new Error("Missing NEXT_PUBLIC_APPOINTMENT_ENDPOINT");
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, message, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      closeSidebar();
    } catch (err) {
      setStatus("error");
      setError(
        isEn
          ? "No se pudo enviar. Verifica la configuración o inténtalo nuevamente."
          : "No se pudo enviar. Verifica la configuración o inténtalo nuevamente."
      );
    }
  };
  return (
    <Fragment>
      <div className="form-back-drop"></div>
      <section className="hidden-bar">
        <div className="inner-box text-center">
          <div className="cross-icon">
            <span className="fa fa-times" />
          </div>
          {/* Mobile slide navigation (visible en tablets/móviles) */}
          <div className="d-xl-none">
            <MobileSlideMenu locale={locale} />
          </div>

          {/* Appointment Form (commented out for future implementation) */}
          {false && (
            <div className="appointment-form d-none d-xl-block">
              <div className="title">
                <h4>{isEn ? "Get Appointment" : "Agendar una cita"}</h4>
              </div>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder={isEn ? "Name" : "Nombre"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder={isEn ? "Email address" : "Correo electrónico"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder={isEn ? "Message" : "Mensaje"}
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="theme-btn" disabled={status === "submitting"}>
                    {status === "submitting"
                      ? isEn
                        ? "Sending..."
                        : "Enviando..."
                      : isEn
                      ? "Send"
                      : "Enviar"}
                  </button>
                </div>
                {status === "error" && (
                  <div className="form-group" style={{ color: "#e74c3c" }}>
                    {error}
                  </div>
                )}
              </form>
            </div>
          )}
          {/*Social Icons*/}
          <div className="social-style-one">
            <a href="https://www.facebook.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/software.strategy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default SideBar;
