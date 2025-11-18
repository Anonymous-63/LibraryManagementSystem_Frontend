
import { NavLink } from "react-router-dom";
import { webPages } from "../config/web-pages";
import useAbac from "../../utils/useAbac";

const Sidebar = () => {
  const { check } = useAbac();

  const renderItem = (page) => {
    const allowed = check(page.key, page.action);
    if (!allowed) return null;

    const hasChildren = page.children && page.children.length > 0;

    return (
      <li key={page.sidebar.route}>
        {hasChildren ? (
          <details>
            <summary className="cursor-pointer">
              <span className="flex items-center gap-2">
                {page.sidebar.icon}
                {page.sidebar.title}
              </span>
            </summary>

            <ul>
              {page.children.map((child) => renderItem(child))}
            </ul>
          </details>
        ) : (
          <NavLink
            to={`/${page.sidebar.route}`}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md 
               ${isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"}`
            }
          >
            {page.sidebar.icon}
            {page.sidebar.title}
          </NavLink>
        )}
      </li>
    );
  };

  return (
    <div className="w-64 bg-base-100 border-r h-screen p-4">
      <ul className="menu menu-md">
        {webPages.map((page) => renderItem(page))}
      </ul>
    </div>
  );
};

export default Sidebar;
