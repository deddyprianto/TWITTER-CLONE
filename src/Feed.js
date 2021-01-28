import React, { useEffect, useState } from "react";
import "./Feed.css";
import db from "./firebase";
import Post from "./Post";
import TweetBox from "./TweetBox";
import FlipMove from "react-flip-move";
import { Flare } from "@material-ui/icons";
function Feed() {
  const [data, setData] = useState([]);
  useEffect(() => {
    db.collection("data")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setData(snapshot.docs.map((res) => ({ id: res.id, init: res.data() })));
      });
  }, []);
  return (
    <div className="feed__container">
      <div className="feed__header">
        <h2>Home</h2>
        <Flare className="icon" />
      </div>
      <TweetBox />
      <FlipMove>
        {data.map(({ id, init }) => (
          <Post
            id={id}
            key={id}
            photo={init.photo}
            name={init.name}
            text={init.text}
            imageurl={init.imageurl}
            time={init.time}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
