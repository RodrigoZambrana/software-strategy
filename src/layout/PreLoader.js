const PreLoader = () => {
  return (
    <div className="preloader">
      <div className="custom-loader" />
      <img
        className="loader-logo"
        src="/assets/images/logos/logo-only.png"
        alt="Loading"
        title="Loading"
        width="220"
        height="220"
      />
    </div>
  );
};
export default PreLoader;
