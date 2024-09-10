import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {AppDispatch } from "../redux/store";

import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { showRightSidebar } from "../redux/actions";

interface ProfileMenuItem {
  label: string;
  icon: string;
  redirectTo: string;
}

interface ProfileDropdownProps {
  menuItems: Array<ProfileMenuItem>;
  profilePic?: string;
  username: string;
  userTitle?: string;
}


const ProfileDropdown = (props: ProfileDropdownProps) => {
  const profilePic = props["profilePic"] || null;
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleRightSideBar = () => {
    dispatch(showRightSidebar());
  };

  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-profile"
        as="a"  
        onClick={toggleDropdown}
        className={classNames(
          "nav-link nav-user me-0 waves-effect waves-light",
          { show: dropdownOpen }
        )}
      >
        <span className="pro-user-name ms-1 px-2">
          {props["username"]} <i className="mdi mdi-chevron-down"></i>
        </span>
        <img src={profilePic!} className="rounded-circle" alt="" />
        
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu dropdown-menu-end profile-dropdown">
        <div onClick={toggleDropdown}>
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>
          {(props.menuItems || []).map((item, i) => {
            return (
              <React.Fragment key={i}>
                {i === props["menuItems"].length - 1 && (
                  <div className="dropdown-divider"></div>
                )}


                {/* {item.label === 'Customize UI' && (
                  <div className="customize-ui">
                    <p>Special content for Customize UI</p>
                  </div>
                )} */}

                {item.label === 'Customize UI' ? (
                  <span
                    key={i + "-profile-menu"}
                    className="dropdown-item notify-item"
                    onClick={handleRightSideBar}
                  >
                    <i className={`${item.icon} me-1`}></i>
                    <span>{item.label}</span>
                  </span>
                  // <div className="customize-ui">Special content for Customize UI</div>
                ) : (
                  <Link
                    to={item.redirectTo}
                    className="dropdown-item notify-item"
                    key={i + "-profile-menu"}
                  >
                    <i className={`${item.icon} me-1`}></i>
                    <span>{item.label}</span>
                  </Link>
                )}


              </React.Fragment>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
