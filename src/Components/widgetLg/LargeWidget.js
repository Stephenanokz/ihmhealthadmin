import React from "react";
import "./LargeWidget.css";

const LargeWidget = () => {

  const Button = ({type}) => {
    return <button className={"largeWidgetButton " + type}>{type}</button>
  }

  return (
    <div className="largeWidget">
      <h3 className="largeWidgetTitle">Latest Transactions</h3>
      <table className="largeWidgetTable">
        <tr className="largeWidgetTr">
          <th className="largeWidgetTh">Customer</th>
          <th className="largeWidgetTh">Date</th>
          <th className="largeWidgetTh">Amount</th>
          <th className="largeWidgetTh">Status</th>
        </tr>
        <tr className="largeWidgetTr">
          <td className="largeWidgetUser">
            <img
              src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
              alt=""
              className="largeWidgetImg"
            />
            <span className="largeWidgetName">Antonella Roccuzzo</span>
          </td>
          <td className="largeWidgetDate">18 Dec 2022</td>
          <td className="largeWidgetAmount">$3,500</td>
          <td className="largeWidgetStatus"><Button type="Approved" /></td>
        </tr>
        <tr className="largeWidgetTr">
          <td className="largeWidgetUser">
            <img
              src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
              alt=""
              className="largeWidgetImg"
            />
            <span className="largeWidgetName">Antonella Roccuzzo</span>
          </td>
          <td className="largeWidgetDate">18 Dec 2022</td>
          <td className="largeWidgetAmount">$3,500</td>
          <td className="largeWidgetStatus"><Button type="Declined" /></td>
        </tr>
        <tr className="largeWidgetTr">
          <td className="largeWidgetUser">
            <img
              src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
              alt=""
              className="largeWidgetImg"
            />
            <span className="largeWidgetName">Antonella Roccuzzo</span>
          </td>
          <td className="largeWidgetDate">18 Dec 2022</td>
          <td className="largeWidgetAmount">$3,500</td>
          <td className="largeWidgetStatus"><Button type="Pending" /></td>
        </tr>
        <tr className="largeWidgetTr">
          <td className="largeWidgetUser">
            <img
              src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=2000"
              alt=""
              className="largeWidgetImg"
            />
            <span className="largeWidgetName">Antonella Roccuzzo</span>
          </td>
          <td className="largeWidgetDate">18 Dec 2022</td>
          <td className="largeWidgetAmount">$3,500</td>
          <td className="largeWidgetStatus"><Button type="Approved" /></td>
        </tr>
      </table>
    </div>
  );
};

export default LargeWidget;
