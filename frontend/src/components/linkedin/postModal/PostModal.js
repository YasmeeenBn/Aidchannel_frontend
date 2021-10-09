import { addPostApi } from "apis/postApi";
import urlImageAdapter from "helpers/urlImageAdapter";
import React, { useState } from "react";
import Modal from "react-modal";
import ImageIcon from "@material-ui/icons/Image";
import "./reactModal.css";
import formDataHelper from "helpers/FormDataHelper";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const PostModal = ({ modalIsOpen, setIsModalOpen, posts, setPosts }) => {
  const [post, setPost] = useState("");
  const [postImagePreview, setPostImagePreview] = useState(null);
  const [postImage, setPostImage] = useState();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  function closeModal() {
    setIsModalOpen(false);
  }
  const sendPost = async () => {
    const formData = formDataHelper(postImage, "postImage", {
      content: post,
      user: userInfo?.user?._id,
    });
    const newPost = await addPostApi(formData);
    setPosts([newPost, ...posts]);
    setPost("");
    setPostImage(undefined);
    setPostImagePreview(null);
    setIsModalOpen(false);
  };
  const imagePreview = (e) => {
    setPostImagePreview(URL.createObjectURL(e.target.files[0]));
    setPostImage(e.target.files[0]);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2>Create a post</h2>
      <hr />
      <div className="row">
        <div className="col-5 mx-2 d-flex my-2">
          <img
            className="img__profil_post"
            src={urlImageAdapter(userInfo?.user?.image_url)}
          />
          <p className="ml-2 font-weight-bold">{userInfo?.user?.fullname}</p>
        </div>

        <div className="col-12 my-3">
          <div className="fram">
            <textarea
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                padding: "20px",
                overflow: "hidden",
              }}
              rows={5}
              value={post}
              onChange={(e) => setPost(e.target.value)}
              className="shadow-none border-none outline-none"
              placeholder="What do you want to talk about ?"
            ></textarea>
            <img
              src={postImagePreview}
              style={{ maxWidth: "200px" }}
              className="mt-3"
            />
          </div>
        </div>
        <div className="col-8 my-3 ml-2">
          <label className="ml-4  d-inline" htmlFor="postImage">
            <ImageIcon
              className="mt-1"
              style={{
                transform: "scale(1.5)",
                color: "#0072b1",
                cursor: "pointer",
              }}
            />
          </label>
          <input
            type="file"
            className="d-none"
            id="postImage"
            name="postImage"
            onChange={imagePreview}
            multiple={false}
          />
        </div>
        <div className="col-2 my-3">
          {post === "" ? (
            <button disabled onClick={sendPost} className="btn btn-primary">
              Publish
            </button>
          ) : (
            <button onClick={sendPost} className="btn btn-primary">
              Publish
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PostModal;
