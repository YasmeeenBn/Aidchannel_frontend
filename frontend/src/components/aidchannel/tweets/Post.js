import React from "react";
import parse from "html-react-parser";
import { FaTwitter } from "react-icons/fa";
import "./Post.css";

function Post({ displayName, username, verified, text, image, avatar }) {
  const hashTagsColor = (text) => {
    let hashTags = text?.match(/#[a-z]+/gi);
    let output = text;
    hashTags?.forEach((element) => {
      output = output
        ?.split(element)
        ?.join('<span style="color:#1b95e0;">' + element + "</span>");
    });
    hashTags = output?.match(/@[a-z]+/gi);

    hashTags?.forEach((element) => {
      output = output
        ?.split(element)
        ?.join('<span style="color:#1b95e0;">' + element + "</span>");
    });
    return output;
  };

  return (
    <div className="container tweet p-3">
      <div className="tweet__header">
        <div className="row">
          <div className="col-2">
            {avatar ? (
              <img src={avatar} alt="..." className="img-thumbnail"></img>
            ) : (
              <img
                src="https://img1.freepng.fr/20180626/ehy/kisspng-avatar-user-computer-icons-software-developer-5b327cc951ae22.8377289615300354013346.jpg"
                alt="..."
                className="img-thumbnail"
              ></img>
            )}
          </div>
          <div className="col-7">
            <h3 className="twitter__name">{displayName}</h3>
            <h5 className="user__name">{username}</h5>
          </div>
          <div className="col-3">
            <FaTwitter size={20} color="#1b95e0" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        {text && (
          <p className="tweet__text">{parse(hashTagsColor(String(text)))}</p>
        )}

        {image && <img className="tweet__img" src={image} alt="tweetimg" />}
      </div>
      <div className="tweet__footer mt-3"></div>
    </div>
  );
}

export default Post;
