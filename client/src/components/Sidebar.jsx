import { NavLink } from "react-router-dom";
import { links } from "../constants";

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen justify-between items-center p-3 max-md:p-2 max-md:gap-20 max-md:justify-normal">
      <img
        className="w-[150px] max-md:w-[90px]"
        src="/recipe_logo.jpg"
        alt="logo"
      />

      <div className="flex flex-col gap-14 ">
        {links.map((link, i) => (
          <NavLink
            className={"flex gap-4 items-center text-lg text-gray-400"}
            key={i}
            to={link.path}
          >
            <span className="max-md:text-2xl">{link.icon}</span>
            <span className="max-md:hidden">{link.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="flex flex-col gap-2 max-md:hidden">
        <p>Günlük Haberleri Al</p>
        <button className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-700 transition">
          Abone Ol
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
