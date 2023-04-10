import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createServiceCall } from "../../context/serviceContext/ServiceApiCalls";
import { ServiceContext } from "../../context/serviceContext/ServiceContext";
import "./NewService.css";

const NewService = () => {
  const [service, setService] = useState(null);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(ServiceContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setService({
      ...service,
      [e.target.name]: value,
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
            setService((prev) => {
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

  console.log(service);

  const handleSubmit = (e) => {
    e.preventDefault();
    createServiceCall(service, dispatch);
    return navigate("/services");
  };

  return (
    <div className="newService">
      <h1 className="addServiceTitle">New Service</h1>
      <form className="addServiceForm">
        <div className="addServiceFormInputs">
          <label>Service Title</label>
          <input
            name="title"
            type="text"
            placeholder="Service Title"
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            name="desc"
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
        {uploaded === 1 ? (
          <button className="newServiceButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="newServiceButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default NewService;
