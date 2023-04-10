import React, { useState, useContext } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updatePersonnelCall } from "../../context/personnelContext/PersonnelApiCalls";
import { PersonnelContext } from "../../context/personnelContext/PersonnelContext";
import "./Personnel.css";

const Personnel = () => {
  const location = useLocation();
  const personnel = location.state.personnel;
  const navigate = useNavigate();
  const [updatedPersonnel, setUpdatedPersonnel] = useState(personnel);
  const [img, setImg] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(PersonnelContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdatedPersonnel({ ...updatedPersonnel, [e.target.name]: value });
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
            setUpdatedPersonnel((prev) => {
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

  console.log(updatedPersonnel);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePersonnelCall(updatedPersonnel, dispatch);
    return navigate(`/personnels`);
  };

  return (
    <div className="personnel">
      <div className="personnelTitleContainer">
        <h1 className="personnelTitle">Personnel</h1>
        <Link to="/newpersonnel">
          <button className="addPersonnelButton">Create</button>
        </Link>
      </div>
      <div className="personnelContainer">
        <div className="personnelLeft">
          <div className="personnelInfoItem">
            <span className="personnelInfoKey">Personnel Title: </span>
            <span className="personnelInfoValue">{personnel.title}</span>
          </div>
          <div className="personnelInfoItem">
            <span className="personnelInfoKey">Full Name: </span>
            <span className="personnelInfoValue">{personnel.fullName}</span>
          </div>
          <div className="personnelInfoItem">
            <span className="personnelInfoKey">Full Name: </span>
            <div className="personnelInfoValue">
              <img src={personnel.img} alt="" className="personnelImg" />
            </div>
          </div>
        </div>
        <div className="personnelRight">
          <form className="personnelForm">
            <div className="personnelFormInputs">
              <label>Personnel Title</label>
              <input
                type="text"
                placeholder={personnel.title}
                name="title"
                onChange={handleChange}
              />
              <label>Full Name</label>
              <input
                type="text"
                placeholder={personnel.fullName}
                name="fullName"
                onChange={handleChange}
              />
              <label>Image</label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
              {!img || uploaded === 1 ? (
                <button className="personnelButton" onClick={handleSubmit}>
                  Update
                </button>
              ) : (
                <button className="personnelButton" onClick={handleUpload}>
                  Upload
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Personnel;
