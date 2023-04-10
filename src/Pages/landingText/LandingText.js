import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateHomeTextCall } from "../../context/homeContext/HomeApiCalls";
import { getHomeTextCall } from "../../context/homeContext/HomeApiCalls";
import { HomeContext } from "../../context/homeContext/HomeContext";
import "./LandingText.css";

let firstLoad = true;

const LandingText = () => {
  const params = useParams();

  const { homeText, dispatch } = useContext(HomeContext);

  useEffect(() => {
    getHomeTextCall(params.landingId, dispatch);
  }, [dispatch, params]);

  let [updatedHomeText, setUpdatedHomeText] = useState(homeText);

  if (homeText && firstLoad) {
    updatedHomeText = homeText;
  }

  const handleChange = (e) => {
    firstLoad = false;
    const value = e.target.value;
    setUpdatedHomeText({ ...updatedHomeText, [e.target.name]: value });
  };

  console.log(updatedHomeText);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateHomeTextCall(updatedHomeText, dispatch);
    getHomeTextCall(params.landingId, dispatch);
  };

  return (
    homeText && (
      <>
        <div className="landing">
          <div className="landingTitleContainer">
            <h1 className="landingTitle">Landing</h1>
          </div>
          <div className="landingContainer">
            <div className="landingLeft">
              <div className="landingInfoItem">
                <span className="landingInfoKey">Title: </span>
                <span className="landingInfoValue">{homeText.title}</span>
              </div>
              <div className="landingInfoItem">
                <span className="landingInfoKey">Subtitle: </span>
                <span className="landingInfoValue">{homeText.subtitle}</span>
              </div>
            </div>
            <div className="landingRight">
              <form className="landingForm">
                <div className="landingFormInputs">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder={homeText.title}
                    name="title"
                    onChange={handleChange}
                  />
                  <label>Subtitle</label>
                  <input
                    type="text"
                    placeholder={homeText.subtitle}
                    name="subtitle"
                    onChange={handleChange}
                  />
                </div>
                <button className="landingButton" onClick={handleSubmit}>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default LandingText;
