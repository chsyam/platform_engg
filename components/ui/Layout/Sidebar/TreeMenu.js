import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faCog,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenus, setActiveSubmenus] = useState([]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSubmenu = (index) => {
    if (activeSubmenus.includes(index)) {
      setActiveSubmenus(activeSubmenus.filter((item) => item !== index));
    } else {
      setActiveSubmenus([...activeSubmenus, index]);
    }
  };

  const menuItems = [
    {
      label: "Home",
      href: "/users",
      icon: faHome,
    },
    {
      label: "Menu 1",
      icon: faHome,
      submenus: [
        {
          label: "Submenu 1",
          href: "/users",
          icon: faList,
        },
        {
          label: "Submenu 2",
          href: "/submenu2",
          icon: faCog,
        },
      ],
    },
    {
      label: "Menu 2",
      href: "/menu2",
      icon: faAngleRight,
    },
  ];

  return (
    <nav className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
      <ul>
        {menuItems.map((menuItem, index) => (
          <li key={index}>
            {menuItem.submenus ? (
              <div
                className={`${styles.menuitem .withsubmenu} ${
                  activeSubmenus.includes(index) ? styles.activesubmenu : ""
                }`}
                onClick={() => toggleSubmenu(index)}
              >
                <FontAwesomeIcon
                  icon={menuItem.icon}
                  className={styles.menuicon}
                />
                {!isCollapsed && <span>{menuItem.label}</span>}
                <ul
                  className={`${styles.submenu} ${
                    activeSubmenus.includes(index) ? styles.expanded : ""
                  }`}
                >
                  {menuItem.submenus.map((submenuItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={submenuItem.href}
                        className={styles.submenuitem}
                      >
                        <FontAwesomeIcon
                          icon={submenuItem.icon}
                          className={styles.submenuicon}
                        />
                        {!isCollapsed && <span>{submenuItem.label}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link href={menuItem.href} className={styles.menuitem}>
                <FontAwesomeIcon
                  icon={menuItem.icon}
                  className={styles.menuicon}
                />
                {!isCollapsed && <span>{menuItem.label}</span>}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
