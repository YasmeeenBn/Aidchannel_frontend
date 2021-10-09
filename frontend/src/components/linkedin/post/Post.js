import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import moment from "moment";
import { useInfiniteQuery } from "react-query";
import TextareaAutosize from "react-textarea-autosize";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import MoreVert from "@material-ui/icons/MoreVert";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import InputOption from "../inputOption/InputOption";
import "./Post.css";
import urlImageAdapter from "helpers/urlImageAdapter";
import Comment from "../comment/Comment";
import {
  addCommentApi,
  getCommentsApi,
  getNumberCommentsApi,
} from "apis/commentApi";
import useIntersectionObserve from "helpers/useIntersectionObserver";
import useIntersectionObserver from "@react-hook/intersection-observer";
import { incrementViewApi } from "apis/postApi";

const Post = forwardRef(
  (
    {
      name,
      description,
      message,
      photoUrl,
      isLike,
      createdAt,
      likes,
      onLike,
      disableLike,
      postImage,
      userId,
      postId,
      views,
    },
    ref
  ) => {
    const history = useHistory();
    const [commentInput, setCommentInput] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [numberComments, setNumberComments] = useState(0);
    const [limit] = useState(2);
    const [refreh, setRefresh] = useState(false);
    const loadMoreButtonRef = useRef();
    const [postRef, setPostRef] = useState();
    const { isIntersecting } = useIntersectionObserver(postRef);

    const getDataFromApi = useCallback(async () => {
      const numberComments = await getNumberCommentsApi(postId);
      setNumberComments(numberComments);
    }, []);

    useEffect(() => {
      getDataFromApi();
    }, [getDataFromApi, refreh]);

    useEffect(() => {
      async function fetchData() {
        if (isIntersecting) {
          await incrementViewApi(postId, userInfo?.user?._id);
        }
      }
      fetchData();
    }, [isIntersecting]);

    const {
      data,
      fetchNextPage,
      isFetching,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery([limit, postId, refreh], getCommentsApi, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.data.length === limit) return parseInt(lastPage.page) + 1;
        return false;
      },
    });

    useIntersectionObserve({
      target: loadMoreButtonRef,
      onIntersect: fetchNextPage,
      enabled: hasNextPage,
    });

    const onPostComment = async () => {
      const comment = {
        content: commentInput,
        post: postId,
        user: userInfo?.user?._id,
        parent_id: null,
      };
      const newComment = await addCommentApi(comment);
      setRefresh(!refreh);
      setCommentInput("");
    };
    return (
      <div ref={setPostRef} className="post border">
        <div className="post__header">
          <Avatar src={photoUrl}>{name[0]}</Avatar>
          <div className="post__info">
            <h2 onClick={() => history.push(`/linkedin/profil/${userId}`)}>
              {name}
            </h2>
            <p className="m-0">{description}</p>
            <p className="m-0">
              {moment(createdAt)
                .startOf("minute")
                .fromNow()}
            </p>
          </div>
          
        </div>

        <div className="post__body">
          <p className="comment_message">{message}</p>
          {postImage && <img src={postImage} width="100%" />}
        </div>
        <div
          className="row ml-3 mt-2"
          style={{ color: "gray", fontSize: "13px" }}
        >
          <div className="col-9">
            <ThumbUpAltOutlinedIcon
              className="mb-1"
              style={{ color: "#0e76a8", width: "15px" }}
            />{" "}
            {likes.length}{" "}
            <span className="ml-4">{numberComments} comments</span>
          </div>

          <div className="col-3">
            <span>{views} views</span>
          </div>
        </div>
        <div className="post__buttons">
          <InputOption
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color={isLike ? "#0e76a8" : "gray"}
            onLike={onLike}
            disableLike={disableLike}
          />
          <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" />
          <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" />
          <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" />
        </div>
        <div className="comment_input row">
          <div className="col-2 col-sm-1">
            <Avatar
              className="comment_avatar mt-2"
              src={urlImageAdapter(userInfo?.user?.image_url)}
            ></Avatar>
          </div>

          <div className="comment__inputContainer col-10 col-11 mb-0">
            <div className="comment__input">
              <form onClick={() => {}}>
                <TextareaAutosize
                  className="textarea"
                  placeholder="Add a comment ..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
              </form>
            </div>
          </div>
          {commentInput !== "" && (
            <button
              onClick={onPostComment}
              className="comment_post_btn btn btn-primary ml-5 shadow-none"
            >
              Post
            </button>
          )}
        </div>
        <div className="comments mt-3">
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((comment, index) => (
                <Comment
                  key={index}
                  user={comment?.user}
                  content={comment?.content}
                />
              ))}
            </React.Fragment>
          ))}
          <div>
            <div
              className="load_comments ml-2"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage && "Load more comments"}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
