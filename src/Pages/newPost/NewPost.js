import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createPostCall } from "../../context/postContext/PostApiCalls";
import { PostContext } from "../../context/postContext/PostContext";
import "./NewPost.css";

const NewPost = () => {
  const [post, setPost] = useState(null);
  const { dispatch } = useContext(PostContext);
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(0);
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setPost({
      ...post,
      [e.target.name]: value,
      author: JSON.parse(localStorage.getItem("user"))._id,
    });
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
            setPost((prev) => {
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
    createPostCall(post, dispatch);
    return navigate("/posts");
  };

  return (
    <div className="newPost">
      <h1 className="addPostTitle">New Post</h1>
      <form className="addPostForm">
        <div className="addPostFormInputs">
            <label>Post Title</label>
            <input
              name="title"
              type="text"
              placeholder="Post Title"
              onChange={handleChange}
            />
            <label>Content</label>
            <textarea
              name="message"
              id=""
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
          <button className="newPostButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="newPostButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default NewPost;
