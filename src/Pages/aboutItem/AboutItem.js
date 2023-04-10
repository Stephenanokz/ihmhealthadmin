import React, { useState, useContext, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useParams } from "react-router-dom";
import { updateAboutItemCall } from "../../context/aboutContext/AboutApiCalls";
import { getAboutItemCall } from "../../context/aboutContext/AboutApiCalls";
import { AboutContext } from "../../context/aboutContext/AboutContext";
import "./AboutItem.css";

let firstLoad = true;

const AboutItem = () => {
  const params = useParams();

  const { aboutItem, dispatch } = useContext(AboutContext);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  useEffect(() => {
    getAboutItemCall(params.aboutId, dispatch);
  }, [dispatch, params]);

  let [updatedAboutItem, setUpdatedAboutItem] = useState(aboutItem);

  if (aboutItem && firstLoad) {
    updatedAboutItem = aboutItem;
  }

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedAboutItem({ ...updatedAboutItem, [e.target.name]: value });
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
            setUpdatedAboutItem((prev) => {
              return { ...updatedAboutItem, [item.label]: downloadURL };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    firstLoad = false;
    e.preventDefault();
    upload([{ file: img, label: "img" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAboutItemCall(updatedAboutItem, dispatch);
    getAboutItemCall(params.aboutId, dispatch);
  };

  return (
    aboutItem && (
      <>
        <div className="aboutItem">
          <div className="aboutItemTitleContainer">
            <h1 className="aboutItemTitle">About</h1>
          </div>
          <div className="aboutItemContainer">
            <div className="aboutItemLeft">
              <div className="aboutItemInfoItem">
                <span className="aboutItemInfoKey">Title: </span>
                <span className="aboutItemInfoValue">{aboutItem.title}</span>
              </div>
              <div className="aboutItemInfoItem">
                <span className="aboutItemInfoKey">Subtitle: </span>
                <span className="aboutItemInfoValue">{aboutItem.name}</span>
              </div>
              <div className="aboutItemInfoItem">
                <span className="aboutItemInfoKey">Body: </span>
                <div className="aboutItemInfoValue">{aboutItem.body}</div>
              </div>
              <div className="aboutItemInfoItem">
                <span className="aboutItemInfoKey">About Photo: </span>
                <div className="aboutItemInfoValue">
                  <img className="aboutitemImg" src={aboutItem.img} alt="" />
                </div>
              </div>
            </div>
            <div className="aboutItemRight">
              <form className="aboutItemForm">
                <div className="aboutItemFormInputs">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder={aboutItem.title}
                    name="title"
                    onChange={handleChange}
                  />
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder={aboutItem.name}
                    name="name"
                    onChange={handleChange}
                  />
                  <label>About Text</label>
                  <textarea
                    cols="30"
                    rows="10"
                    type="text"
                    placeholder={aboutItem.body}
                    name="body"
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
                  <button className="aboutItemButton" onClick={handleSubmit}>
                    Update
                  </button>
                ) : (
                  <button className="aboutItemButton" onClick={handleUpload}>
                    Upload
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default AboutItem;
