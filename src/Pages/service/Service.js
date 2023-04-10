import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateServiceCall } from "../../context/serviceContext/ServiceApiCalls";
import { ServiceContext } from "../../context/serviceContext/ServiceContext";
import "./Service.css";

const Service = () => {
  const location = useLocation();
  const service = location.state.service;
  const navigate = useNavigate();
  const [updatedService, setUpdatedService] = useState(service);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(ServiceContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedService({ ...updatedService, [e.target.name]: value });
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
            setUpdatedService((prev) => {
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

  console.log(updatedService);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateServiceCall(updatedService, dispatch);
    return navigate(`/services`);
  };

  return (
    <div className="service">
      <div className="serviceTitleContainer">
        <h1 className="serviceTitle">Service</h1>
        <Link to="/newservice">
          <button className="addServiceButton">Create</button>
        </Link>
      </div>
      <div className="serviceContainer">
        <div className="serviceLeft">
          <div className="serviceInfoItem">
            <span className="serviceInfoKey">Service Title: </span>
            <span className="serviceInfoValue">{service.title}</span>
          </div>
          <div className="serviceInfoItem">
            <span className="serviceInfoKey">Description: </span>
            <div className="serviceInfoValue">{service.desc}</div>
          </div>
          <div className="serviceInfoItem">
            <span className="serviceInfoKey">Service photo: </span>
            <div className="serviceInfoValue">
              <img className="serviceImg" src={service.img} alt="" />
            </div>
          </div>
        </div>
        <div className="serviceRight">
          <form className="serviceForm">
            <div className="serviceFormInputs">
              <label>Post Title</label>
              <input
                type="text"
                placeholder={service.title}
                name="title"
                onChange={handleChange}
              />
              <label>Content</label>
              <textarea
                name="desc"
                className="serviceInput"
                cols="30"
                rows="10"
                placeholder={service.desc}
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
              <button className="serviceButton" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button className="serviceButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Service;
