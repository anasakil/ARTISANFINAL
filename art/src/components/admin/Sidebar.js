import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { HiMenuAlt3, HiOutlineCube, HiOutlineShoppingCart, HiOutlineCog } from "react-icons/hi";
import { MdOutlineDashboard, MdLogout, MdOutlinePayment } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const menus = [
    { name: "Dashboard", link: "/AdminDashboard", icon: MdOutlineDashboard },
    { name: "Products", link: "/admin/users", icon: HiOutlineCube },
    { name: "Orders", link: "/admin/categories", icon: HiOutlineShoppingCart },
    { name: "Customers", link: "/admin/users", icon: AiOutlineUser, margin: true },
    { name: "Payment", link: "/admin/categories", icon: MdOutlinePayment },
    { name: "Settings", link: "/", icon: RiSettings4Line },
    { name: "Support", link: "/", icon: HiOutlineCog, margin: true },
    { name: "Logout", link: "/", icon: MdLogout },
  ];

  return (
    

    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      style={{ backgroundColor: '#97644E', width: collapsed ? '4rem' : '18rem' }}
      className={`custom-sider ${collapsed ? "w-16" : "w-72"} bg-custom-brown`}

    >
      <div className="logo flex justify-end p-3 [bg-[#97644E]">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={toggleCollapsed}
        />
      </div>
      <div className="flex items-center justify-center py-3">
        <img src="artisan.png" alt="Logo" className="h-12" />
      </div>
      <Menu    defaultSelectedKeys={['1']} className="custom-menu bg-[#97644E] ">
        {menus.map((menu, i) => (
          <Menu.Item
            key={i}
            icon={React.createElement(menu.icon, { size: "20" })}
            className={`custom-menu-item ${menu.margin && "mt-5"} bg-[#97644E] `}
            title={collapsed ? menu.name : undefined}
          >
            <Link to={menu.link}>{menu.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;