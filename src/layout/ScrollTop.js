import { DoubleChevronUpIcon } from "@/src/components/icons/SimpleIcons";

const ScrollTop = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button className="scroll-top scroll-to-target" onClick={() => scrollTop()} aria-label="Volver arriba" title="Volver arriba" type="button">
      <DoubleChevronUpIcon />
    </button>
  );
};
export default ScrollTop;
