import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import "./Adminsidebar.scss";
import { RiDashboard3Line } from "react-icons/ri";
import { MdAssignmentInd } from "react-icons/md";

import { MdOutlineContentPaste } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaPeopleCarry } from "react-icons/fa";
import { FcBusinessman } from "react-icons/fc";

class Adminsidebar extends Component {
  render() {
    return (
      <div>
        <ProSidebar collapsed={false}>
          <Menu iconShape="square">
            <MenuItem icon={<RiDashboard3Line />}>Dashboard</MenuItem>
            <SubMenu icon={<MdAssignmentInd />} title="Ragister user">
              <MenuItem>
                Ragister student
                <Link to="/admin/Ragister" />
              </MenuItem>
              <MenuItem>
                Ragister educator
                <Link to="/admin/Ragister" />
              </MenuItem>
            </SubMenu>
            <SubMenu icon={<FaPeopleCarry />} title="Educator">
              <MenuItem>
                Add educator
                <Link to="/admin/addteacher" />
              </MenuItem>
            </SubMenu>
            <SubMenu icon={<FcBusinessman />} title="Student">
              <MenuItem>
                Add student
                <Link to="/admin/addstudent" />
              </MenuItem>
            </SubMenu>
            <SubMenu icon={<IoIosNotifications />} title="Notification">
              <MenuItem>
                post Notification
                <Link to="/admin/postnotification" />
              </MenuItem>
            </SubMenu>
            <SubMenu icon={<MdOutlineContentPaste />} title="weekly content">
              <MenuItem>
                class 9
                <Link to="/admin/studentcontent" />
              </MenuItem>
              <MenuItem>
                class 10
                <Link to="/admin/studentcontent" />
              </MenuItem>
              <MenuItem>
                class 11
                <Link to="/admin/studentcontent" />
              </MenuItem>
              <MenuItem>
                class 12
                <Link to="/admin/studentcontent" />
              </MenuItem>
              <MenuItem>
                jee mains
                <Link to="/admin/studentcontent" />
              </MenuItem>
              <MenuItem>
                class JNV
                <Link to="/admin/studentcontent" />
              </MenuItem>
              <MenuItem>
                class Navoda
                <Link to="/admin/studentcontent" />
              </MenuItem>
              <MenuItem>
                CHS
                <Link to="/admin/studentcontent" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </ProSidebar>
      </div>
    );
  }
}
export default Adminsidebar;
