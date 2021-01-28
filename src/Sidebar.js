import React from "react";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import { Button } from "@material-ui/core";
import {
  Home,
  Explore,
  NotificationsNone,
  MailOutline,
  BookmarkBorder,
  ListAlt,
  PermIdentity,
  MoreHoriz,
} from "@material-ui/icons";
function Sidebar() {
  return (
    <div className="Sidebar__Container">
      <img
        className="twitter__icon"
        src="./img/png-clipart-twitter-twitter.png"
        alt=""
      />
      <SidebarOptions active text="Home" Icon={Home} />
      <SidebarOptions text="Explore" Icon={Explore} />
      <SidebarOptions text="Notifications" Icon={NotificationsNone} />
      <SidebarOptions text="Messages" Icon={MailOutline} />
      <SidebarOptions text="Bookmarks" Icon={BookmarkBorder} />
      <SidebarOptions text="Lists" Icon={ListAlt} />
      <SidebarOptions text="Profile" Icon={PermIdentity} />
      <SidebarOptions text="More" Icon={MoreHoriz} />
      <Button variant="outlined" className="sidebar_Tweet">
        Tweet
      </Button>
    </div>
  );
}

export default Sidebar;
