import React from "react";
import "./Widgets.css";
import {
  TwitterShareButton,
  TwitterTweetEmbed,
  TwitterTimelineEmbed,
  TwitterFollowButton,
  TwitterMentionButton,
} from "react-twitter-embed";
import { Search } from "@material-ui/icons";
function Widgets() {
  return (
    <div className="Widgets__Container">
      <div className="input__widgets">
        <Search />
        <input type="text" placeholder="Cari di Twitter" />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="ddeeddyy1"
        options={{ height: 500 }}
      />
      <TwitterTweetEmbed tweetId={"1347567466747031552"} />
      <TwitterFollowButton screenName={"ddeeddyy1"} />
    </div>
  );
}

export default Widgets;
