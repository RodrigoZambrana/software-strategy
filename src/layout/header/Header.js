import DefaultHeader from "./DefaultHeader";
import Header2 from "./Header2";
import Header5 from "./Header5";
const Header = ({ header, singleMenu, dark, locale }) => {
  switch (header) {
    case 1:
      return <DefaultHeader singleMenu={singleMenu} dark={dark} locale={locale} />;

    case 2:
      return <Header2 singleMenu={singleMenu} dark={dark} locale={locale} />;

    case 5:
      return <Header5 singleMenu={singleMenu} dark={dark} locale={locale} />;

    default:
      return <Header5 singleMenu={singleMenu} dark={dark} locale={locale} />;
  }
};
export default Header;
