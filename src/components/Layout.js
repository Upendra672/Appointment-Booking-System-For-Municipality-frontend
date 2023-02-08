import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";
// import img from "../image/logo.png"

function Layout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-gear-line",
    },
    {
      name: "Appointment",
      path: "/appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Apply Department",
      path: "/apply-department",
      icon: "ri-government-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-6-line",
    },
  ];
  const departmentMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-gear-line",
    },
    {
      name: "Appointment",
      path: "/department/appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Profile",
      path: `/department/profile/${user?._id}`,
      icon: "ri-user-6-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-gear-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-add-line",
    },
    {
      name: "Departments",
      path: "/admin/departmentlist",
      icon: "ri-government-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-6-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDepartment
    ? departmentMenu
    : userMenu;
    const role = user?.isAdmin?"Admin" :user?.isDepartment?"Department" :"User";
  return (

    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            {/* <img src={img} />
             */}
             <h1 className="logo">PI</h1>
            <h1 className="role">{role}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-item-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-2-line header-action-icon px-3"></i>
              </Badge>
              <Link className="anchor mx-2" to="/profile">
              {/* <Link className="anchor mx-2" to='/department/profile/${user?._id}'> */}
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{props.children}</div>
        </div>
      </div>
    </div>
  
  );
}

export default Layout;
