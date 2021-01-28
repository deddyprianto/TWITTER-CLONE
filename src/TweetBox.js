import React, { useState } from "react";
import "./TweetBox.css";
import { Button, Avatar, IconButton } from "@material-ui/core";
import { statevalueProvider } from "./StateProvider";
import firebase from "firebase";
import {
  PhotoLibrary,
  Gif,
  QuestionAnswer,
  EmojiEmotions,
  InsertInvitation,
} from "@material-ui/icons";
import db, { storage } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";

function TweetBox() {
  const [{ login }, dispatch] = statevalueProvider();
  const [text, setText] = useState("");
  const [imagestring, setImagestring] = useState("");
  const [progress, setProgress] = useState(0);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
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
    input: {
      display: "none",
    },
  }));
  const classes = useStyles();
  const handleButtonImage = (e) => {
    if (e.target.files[0]) {
      setImagestring(e.target.files[0]);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (imagestring) {
      const uploadTask = storage
        .ref(`image/${imagestring.name}`)
        .put(imagestring);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const process = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(process);
        },
        (err) => alert(err),
        () => {
          storage
            .ref("image")
            .child(imagestring.name)
            .getDownloadURL()
            .then((url) => {
              const tanggal = new Date();
              const hari = tanggal.toString();
              db.collection("data").add({
                name: login.displayName,
                text: text,
                imageurl: url,
                time: hari,
                photo: login.photoURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
          setProgress(0);
          setImagestring(null);
          setText("");
        }
      );
    } else {
      const tanggal = new Date();
      const hari = tanggal.toString();
      db.collection("data").add({
        name: login.displayName,
        text: text,
        time: hari,
        imageurl: "",
        photo: login.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setProgress(0);
      setImagestring(null);
      setText("");
    }
  };
  return (
    <div className="tweetBox">
      <form onSubmit={submitHandler}>
        <div className="tweetBox__input">
          <Avatar className={classes.large} src={login.photoURL} />
          <input
            type="text"
            value={text}
            onChange={(val) => setText(val.target.value)}
            placeholder={`Apa yg kamu pikirkan ${login.displayName}`}
            className="input__text"
            style={{ color: "#F3F3F4" }}
          />
        </div>
        <div className="container__proggress"></div>
        <div className="baris__upload">
          <input
            onChange={handleButtonImage}
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <div className="icons__button">
            <label htmlFor="icon-button-file">
              <IconButton aria-label="upload picture" component="span">
                <PhotoLibrary style={{ color: "#50b7f5" }} />
              </IconButton>
            </label>
            <IconButton>
              <Gif style={{ color: "#50b7f5" }} />
            </IconButton>
            <IconButton>
              <QuestionAnswer style={{ color: "#50b7f5" }} />
            </IconButton>
            <IconButton>
              <EmojiEmotions style={{ color: "#50b7f5" }} />
            </IconButton>
            <IconButton>
              <InsertInvitation style={{ color: "#50b7f5" }} />
            </IconButton>
          </div>
          <Button type="submit" className="tweetBox__tweetButton">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
