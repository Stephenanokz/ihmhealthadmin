import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updatePostCall } from "../../context/postContext/PostApiCalls";
import { PostContext } from "../../context/postContext/PostContext";
import "./Post.css";

const Post = () => {
  const location = useLocation();
  const post = location.state.post;
  const navigate = useNavigate();
  const [updatedPost, setUpdatedPost] = useState(post);
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);
  const { dispatch } = useContext(PostContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedPost({ ...updatedPost, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/files/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + "% completed.");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdatedPost((prev) => {
              return { ...prev, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: img, label: "img" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostCall(updatedPost, dispatch);
    return navigate(`/posts`);
  };

  return (
    <div className="post">
      <div className="postTitleContainer">
        <h1 className="postTitle">News and Events</h1>
        <Link to="/newpost">
          <button className="addPostButton">Create</button>
        </Link>
      </div>
      <div className="postContainer">
        <div className="postLeft">
          <div className="postInfoItem">
            <span className="postInfoKey">Post Title: </span>
            <span className="postName">{post.title}</span>
          </div>
          <div className="postInfoItem">
            <span className="postInfoKey">Content: </span>
            <div className="postInfoValue">{post.message}</div>
          </div>
          {post.img && (
            <div className="postInfoItem">
              <span className="postInfoKey">Post Image: </span>
              <div className="postInfoValue">
                <img className="postImg" src={post.img} alt="" />
              </div>
            </div>
          )}
        </div>
        <div className="postRight">
          <form className="postForm">
            <div className="postFormInputs">
              <label>Post Title</label>
              <input
                type="text"
                placeholder={post.title}
                name="title"
                onChange={handleChange}
              />
              <label>Content</label>
              <textarea
                name="message"
                className="postInput"
                placeholder={post.message}
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
              <label>Image</label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            {!img || uploaded === 1 ? (
              <button className="postButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="postButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
