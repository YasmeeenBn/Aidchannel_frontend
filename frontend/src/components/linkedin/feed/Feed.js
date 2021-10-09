import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import InputOption from "../inputOption/InputOption";
import Post from "../post/Post";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import FlipMove from "react-flip-move";
import "./Feed.css";
import HeaderOption from "../header/HeaderOption";
import urlImageAdapter from "helpers/urlImageAdapter";
import {
  addLikeToPostApi,
  deleteLikeFromPostApi,
  getPostsApi,
} from "apis/postApi";
import PostModal from "../postModal/PostModal";

Modal.setAppElement("#root");

function Feed() {
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [disableLikeButton, setDisableLikeButton] = useState({
    postId: null,
    disabled: false,
  });
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const getDataFromApi = useCallback(async () => {
    const posts = await getPostsApi();
    setPosts(posts);
  }, []);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const onLike = async (post) => {
    setDisableLikeButton({
      postId: post._id,
      disabled: true,
    });
    if (isIncludeUserId(post?.likes).isExist) {
      console.log("debut");
      await deleteLikeFromPostApi(
        isIncludeUserId(post?.likes).likeId,
        post?._id
      );
      const newPosts = posts.map((mapPost) => {
        console.log("map");
        if (mapPost?._id == post?._id) {
          console.log("if");
          const filtredLikes = mapPost?.likes?.filter((like) => {
            if (like?._id == isIncludeUserId(post?.likes).likeId) return false;
            return true;
          });

          return { ...mapPost, likes: filtredLikes };
        }
        return mapPost;
      });

      setPosts(newPosts);
    } else {
      const newLike = await addLikeToPostApi(userInfo?.user?._id, post?._id);
      const newPosts = posts.map((mapPost) => {
        if (mapPost?._id == post?._id)
          return { ...mapPost, likes: [...mapPost.likes, newLike] };
        return mapPost;
      });
      setPosts(newPosts);
    }
    setDisableLikeButton({
      postId: null,
      disabled: false,
    });
  };

  const isIncludeUserId = (likes) => {
    const like = likes.filter((like) => {
      if (like.userId == userInfo.user._id) return true;
      return false;
    });
    if (like.length > 0) return { isExist: true, likeId: like[0]._id };
    return { isExist: false, likeId: null };
  };

  return (
    <>
      <div className="feed">
        <div className="feed__inputContainer">
          <div className="feed__input">
            <HeaderOption avatar={true} title="" onClick={() => {}} />
            <form onClick={() => setIsModalOpen(true)}>
              <input
                disabled
                placeholder="Start a post"
                // onChange={(e) => setInput(e.target.value)}
                type="text"
                className="input__post__disabled"
              />
            </form>
          </div>

          <div className="feed__inputOptions">
            <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
            <InputOption
              Icon={SubscriptionsIcon}
              title="Video"
              color="#E7A33E"
            />
            <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
            <InputOption
              Icon={CalendarViewDayIcon}
              title="Write"
              color="#7FC15E"
            />
          </div>
        </div>
        <FlipMove>
          {posts?.map((post, index) => (
            <Post
              key={index}
              postId={post?._id}
              userId={post?.user?._id}
              views={post?.views?.length}
              name={post?.user?.fullname}
              description={post?.user?.job_title}
              message={post?.content}
              photoUrl={urlImageAdapter(post?.user?.image_url)}
              postImage={post.image ? urlImageAdapter(post?.image) : undefined}
              createdAt={post?.createdAt}
              onLike={() => onLike(post)}
              isLike={isIncludeUserId(post?.likes).isExist}
              likes={post?.likes}
              disableLike={
                disableLikeButton?.disabled == true &&
                post?._id == disableLikeButton?.postId
                  ? true
                  : false
              }
            />
          ))}
        </FlipMove>
      </div>
      <PostModal
        modalIsOpen={modalIsOpen}
        setIsModalOpen={setIsModalOpen}
        posts={posts}
        setPosts={setPosts}
      />
    </>
  );
}

export default Feed;
