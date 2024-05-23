import React, { useState } from "react";
import { HiMenuAlt3,HiOutlineCube,HiOutlineShoppingCart,HiOutlineCog } from "react-icons/hi";
import { MdOutlineDashboard,MdLogout,MdOutlinePayment  } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RiSettings4Line } from "react-icons/ri";

import { Link } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "/sellerdashboard", icon: MdOutlineDashboard },
    { name: "Products", link: "/sellerdashboard/addproduct", icon:HiOutlineCube},
    { name: "Orders", link: "/sellerdashboard/orders", icon:HiOutlineShoppingCart},
    { name: "Profile", link: "/sellerdashboard/profile", icon: AiOutlineUser, margin: true },
    { name: "subscribe", link: "/sellerdashboard/subscribe", icon: MdOutlinePayment  },
    { name: "Settings", link: "/", icon: RiSettings4Line },
    { name: "Support", link: "/", icon: HiOutlineCog, margin: true },
    { name: "Logout", link: "/", icon: MdLogout },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#97644E] min-h-screen ${
          open ? "w-60" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="flex items-center justify-center py-3">
          <img src="artisan.png" alt="Logo" className="h-12" />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
     
    </section>
  );
};

export default Sidebar;