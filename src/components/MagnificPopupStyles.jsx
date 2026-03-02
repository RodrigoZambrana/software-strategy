export default function MagnificPopupStyles() {
  return (
    <style jsx global>{`
      .mfp-bg {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1042;
        overflow: hidden;
        position: fixed;
        background: #0b0b0b;
        opacity: 0.8;
      }
      .mfp-wrap {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1043;
        position: fixed;
        outline: 0 !important;
        -webkit-backface-visibility: hidden;
      }
      .mfp-container {
        text-align: center;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        padding: 0 8px;
        box-sizing: border-box;
      }
      .mfp-container:before {
        content: "";
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      .mfp-content {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin: 0 auto;
        text-align: left;
        z-index: 1045;
      }
      .mfp-preloader {
        color: #ccc;
        position: absolute;
        top: 50%;
        width: auto;
        text-align: center;
        margin-top: -0.8em;
        left: 8px;
        right: 8px;
        z-index: 1044;
      }
      .mfp-s-ready .mfp-preloader {
        display: none;
      }
      .mfp-close {
        width: 44px;
        height: 44px;
        line-height: 44px;
        position: absolute;
        right: 0;
        top: -40px;
        text-decoration: none;
        text-align: center;
        opacity: 0.85;
        color: #fff;
        font-style: normal;
        font-size: 28px;
        background: transparent;
        border: 0;
        cursor: pointer;
      }
      .mfp-iframe-holder,
      .mfp-img-container {
        padding-top: 40px;
        padding-bottom: 40px;
      }
      .mfp-iframe-holder .mfp-content,
      .mfp-img-container .mfp-content {
        line-height: 0;
        width: 100%;
        max-width: 900px;
      }
      .mfp-iframe-scaler {
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-top: 56.25%;
        background: #000;
      }
      .mfp-iframe-scaler > :global(div),
      .mfp-iframe-scaler iframe,
      .mfp-iframe-scaler .react-player {
        position: absolute !important;
        display: block;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
      }
      .mfp-img {
        width: auto;
        max-width: 100%;
        max-height: calc(100vh - 80px);
        height: auto;
        display: block;
        box-sizing: border-box;
        margin: 0 auto;
        background: #fff;
      }
      @media all and (max-width: 900px) {
        .mfp-container {
          padding-left: 6px;
          padding-right: 6px;
        }
      }
    `}</style>
  );
}
