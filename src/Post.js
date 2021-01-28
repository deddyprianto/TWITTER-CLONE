import React, { useState, useEffect, forwardRef } from "react";
import "./Post.css";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  VerifiedUser,
  Repeat,
  FavoriteBorder,
  Publish,
  MoreHoriz,
  SentimentVeryDissatisfied,
  PersonAddDisabled,
  PostAdd,
  VolumeOff,
  Block,
  Code,
  Flag,
  Favorite,
  Comment,
  Send,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import FlipMove from "react-flip-move";
import db from "./firebase";
import { statevalueProvider } from "./StateProvider";
import firebase from "firebase";
const Post = forwardRef(({ id, photo, name, text, imageurl, time }, ref) => {
  const [{ login }, dispatch] = statevalueProvider();
  const [anchorEl, setAnchorEl] = useState(null);
  const [initlike, setInitlike] = useState(false);
  const [comment, setComment] = useState("");
  const [rescomment, setRescomment] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection("data")
        .doc(id)
        .collection("comment")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setRescomment(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
      input: {
        "& > *": {
          margin: theme.spacing(1),
          width: "25ch",
        },
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));
  const handleComment = (e) => {
    e.preventDefault();
    db.collection("data").doc(id).collection("comment").add({
      text: comment,
      username: login.displayName,
      photouser: login.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  const handleButtonLike = () => {
    setInitlike(true);
  };
  const classes = useStyles();
  return (
    <div key="" className="post" ref={ref}>
      <div className="post__avatar">
        <Avatar className={classes.large} src={photo} />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{name}</h3>
            <VerifiedUser className="post__badge" />
            <p style={{ color: "gray", fontSize: "10px" }}>{time}</p>
            <div className="icon__container">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ color: "white", marginRight: "-50px" }}
              >
                <MoreHoriz />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <SentimentVeryDissatisfied />
                  <p>Not Interested in this Tweet</p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <PersonAddDisabled />
                  <p>Unfollow @{name}</p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <PostAdd />
                  <p>Add/remove from list</p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <VolumeOff />
                  <p>mute @{name}</p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Block />
                  <p>Block @{name}</p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Code />
                  <p>Embed Tweet</p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Flag />
                  <p>Report Tweet</p>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="post__headerDesc">
            <p style={{ color: "white", fontSize: "20px" }}>{text}</p>
          </div>
        </div>
        <img src={imageurl} alt="" className="image__post" />
        <form className="inputan__comment">
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <IconButton
            type="submit"
            onClick={handleComment}
            style={{ color: "white" }}
          >
            <Send fontSize="small" />
          </IconButton>
        </form>
        {/* display your data Comment */}
        <FlipMove>
          {rescomment.map((res) => (
            <div className="">
              <div className="post__comment">
                <div className="icon__avatarComment">
                  <Avatar sizes="small" src={res.photouser} />
                </div>
                <div className="post__Commentheader">
                  <h4>{res.username}</h4>
                </div>
              </div>
              <div className="post__Commentfooter">
                <p>{res.text}</p>
              </div>
            </div>
          ))}
        </FlipMove>

        <div className="post__footer">
          <IconButton style={{ color: "white" }}>
            <Comment fontSize="small" />
          </IconButton>
          <IconButton style={{ color: "white" }}>
            <Repeat fontSize="small" />
          </IconButton>
          <IconButton onClick={handleButtonLike} style={{ color: "white" }}>
            {initlike ? (
              <Favorite style={{ color: "red" }} fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
          <IconButton style={{ color: "white" }}>
            <Publish fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
});

export default Post;
