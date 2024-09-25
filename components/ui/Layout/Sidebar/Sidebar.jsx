import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import styles from './Sidebar.module.css';
import Deployment from "../../../icons/Deployment";

import {
	ArrowIcon,
	DashboardIcon,
	UserIcon,
	TemplateIcon,
} from "../../../icons";
import Jira from "../../../icons/Jira";
import Services from "../../../icons/Services";
import Metrics from "../../../icons/Metrics";

function menuList(roles) {
	const sidebarMenu = [
		(roles && (roles?.includes("platform-admin") || roles?.includes("project-admin"))) && { id: 1, label: "Dashboard", icon: DashboardIcon, collapsed: true, link: "/" },
		{ id: 2, label: "Template Management", icon: TemplateIcon, collapsed: true, link: "/templates" },
		{ id: 3, label: "User Management", icon: UserIcon, collapsed: true, link: "/user_management", submenus: [] },
		{ id: 5, label: "Deployed Services", icon: Deployment, link: "/deployments", collapsed: true },
		{ id: 6, label: "Common Services", icon: Services , link: "/services", collapsed: true },
		{ id: 7, label: "DevSecOps Metrics", icon: Metrics, link: "/metrics" , collapsed: true },
		{ id: 8, label: "Raise an Issue",link:"/raise_issues", icon: Jira, collapsed: true },
	];

	return sidebarMenu.filter(menu => {
		if (menu?.label === "User Management"){
			if (roles && (roles?.includes("platform-admin") || roles?.includes("project-admin"))) return menu;
		}else if(menu?.id === 7){
			if(roles && roles?.includes("platform-admin")) return menu;
		}
		else if(roles && roles?.includes("developer") && menu?.label === "Dashboard"){
			return;
		}
		else {
			return menu;
		}
	})
}

const Sidebar = ({username,roles}) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [menuItems, setMenu] = useState(menuList(roles));
  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const router = useRouter();

  const handleMenuHover = (menuId) => {
    setHoveredMenuId(menuId);
  };

  const activeMenu = useMemo(() => {
    const currentPathSegments = router.pathname.split('/');
  
    return menuItems.find(
      (menu) => menu.link === `/${currentPathSegments[1]}`
    );
  }, [router.pathname, menuItems]);
          
  const handleMenuClick = (menu) => {
    router.push(`${menu.link}`);
  }

  	const handleSidebarToggle = () => {
	    setToggleCollapse(!toggleCollapse);
	};

 	return (
    	<div className={styles.mainContainer} style={toggleCollapse ? {width : "60px"} : {width: "320px"}}>
			<div className={styles.head}>
				{
					(toggleCollapse === false) &&
					<div className={styles.userDetails}>
						<div className={styles.username}>
							{username && username!=="" ? username[0].toUpperCase()+username.slice(1,) : "Admin"}
						</div>
						<div className={styles.department}>
							{
								roles && roles?.includes("platform-admin") ? "Platform Admin": roles && roles?.includes("project-admin") ? "Project Admin" : roles && roles?.includes("developer") ? "Developer":""
							}
						</div>
					</div>
				}
          
				<span onClick={handleSidebarToggle}>
					<ArrowIcon direction={toggleCollapse ? "left" : "right"} />
				</span>
			</div>

	        <div className={styles.menu}>
	          	{menuItems.map(({ icon: Icon, ...menu }) => {
	            return (
	              	<div
	                key={menu.id}
	                className={styles.menuItem}
	                style={{
	                  ...(toggleCollapse
	                    ? {
	                        display: "flex",
	                        flexDirection: "row",
	                        alignItems: "center",
	                        justifyContent: "center",
	                      }
	                    : {}),
	                  ...(activeMenu && activeMenu.id === menu.id
	                    ? {
	                        background: "linear-gradient(90deg, #0C2132 -1.34%, #174D95 100.46%)",
	                      }
	                    : {}),
	                    ...(hoveredMenuId === menu.id
	                      ? {
	                          background: "linear-gradient(90deg, #0C2132 -1.34%, #174D95 100.46%)",
	                        }
	                      : {}),
	                }}
	                
	                onClick={() => handleMenuClick(menu)}
	                onMouseEnter={() => handleMenuHover(menu.id)}
	                onMouseLeave={() => handleMenuHover(null)}
	              >
	                <div>	
	                  <Icon 
					  	fill={(activeMenu && activeMenu.id === menu.id)||(hoveredMenuId === menu.id) ? "white" : "#0C2132"}
						style={(activeMenu && activeMenu.id === menu.id)||(hoveredMenuId === menu.id) ? "white" : "#0C2132"}
					  />
	                </div>

	                {!toggleCollapse && (
	                  <span style={(activeMenu && activeMenu.id === menu.id)||(hoveredMenuId === menu.id) ? { color: "#FFF" } : { color: "#333"}}>{menu.label}</span>
	                )}
	              </div>
	            );
	          })}
	        </div>
    </div>
  );
};

export default Sidebar;