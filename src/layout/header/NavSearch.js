import { useState } from "react";
import { SearchIcon } from "@/src/components/icons/SimpleIcons";

const NavSearch = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="nav-search py-10">
      <button type="button" onClick={() => setToggle(!toggle)} aria-label="Search">
        <SearchIcon />
      </button>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          setToggle(false);
        }}
        className={toggle ? "" : "hide"}
      >
        <input
          type="text"
          placeholder="Search"
          className="searchbox"
          required
        />
        <button type="submit" className="searchbutton" aria-label="Search">
          <SearchIcon size={16} />
        </button>
      </form>
    </div>
  );
};
export default NavSearch;
