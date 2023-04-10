import { Visibility } from "@material-ui/icons";
import React from "react";
import "./SmallWidget.css";

const SmallWidget = () => {
  return (
    <div className="smallWidget">
      <span className="smallWidgetTitle">Recently Joined Members</span>
      <ul className="smallWidgetList">
        <li className="smallWidgetListItem">
          <img
            src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
            alt=""
            className="smallWidgetImg"
          />
          <div className="smallWidgetUser">
            <span className="smallWidgetUsername">Zac Mosif</span>
            <span className="smallWidgetUserTitle">Designer</span>
          </div>
          <button className="smallWidgetButton">
            <Visibility className="smallWidgetIcon" />
            Display
          </button>
        </li>
        <li className="smallWidgetListItem">
          <img
            src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
            alt=""
            className="smallWidgetImg"
          />
          <div className="smallWidgetUser">
            <span className="smallWidgetUsername">Zac Mosif</span>
            <span className="smallWidgetUserTitle">Designer</span>
          </div>
          <button className="smallWidgetButton">
            <Visibility className="smallWidgetIcon" />
            Display
          </button>
        </li>
        <li className="smallWidgetListItem">
          <img
            src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
            alt=""
            className="smallWidgetImg"
          />
          <div className="smallWidgetUser">
            <span className="smallWidgetUsername">Zac Mosif</span>
            <span className="smallWidgetUserTitle">Designer</span>
          </div>
          <button className="smallWidgetButton">
            <Visibility className="smallWidgetIcon" />
            Display
          </button>
        </li>
        <li className="smallWidgetListItem">
          <img
            src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
            alt=""
            className="smallWidgetImg"
          />
          <div className="smallWidgetUser">
            <span className="smallWidgetUsername">Zac Mosif</span>
            <span className="smallWidgetUserTitle">Designer</span>
          </div>
          <button className="smallWidgetButton">
            <Visibility className="smallWidgetIcon" />
            Display
          </button>
        </li>
        <li className="smallWidgetListItem">
          <img
            src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
            alt=""
            className="smallWidgetImg"
          />
          <div className="smallWidgetUser">
            <span className="smallWidgetUsername">Zac Mosif</span>
            <span className="smallWidgetUserTitle">Designer</span>
          </div>
          <button className="smallWidgetButton">
            <Visibility className="smallWidgetIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SmallWidget;
