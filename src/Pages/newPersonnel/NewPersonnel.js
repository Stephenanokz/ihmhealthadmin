import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createPersonnelCall } from "../../context/personnelContext/PersonnelApiCalls";
import { PersonnelContext } from "../../context/personnelContext/PersonnelContext";
import "./NewPersonnel.css";

const NewPersonnel = () => {
  const [personnel, setPersonnel] = useState(null);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(PersonnelContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setPersonnel({
      ...personnel,
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
            setPersonnel((prev) => {
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

  console.log(personnel);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPersonnelCall(personnel, dispatch);
    return navigate("/personnels");
  };

  return (
    <div className="newPersonnel">
      <h1 className="addPersonnelTitle">New Personnel</h1>
      <form className="addPersonnelForm">
        <div className="addPersonnelFormInputs">
          <label>Full Name</label>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
          />
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            onChange={handleChange}
          />
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        {!img || uploaded === 1 ? (
          <button className="newPersonnelButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="newPersonnelButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default NewPersonnel;
