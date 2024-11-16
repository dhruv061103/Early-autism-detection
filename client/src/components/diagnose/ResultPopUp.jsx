import React, { useContext } from "react";
import "./resultpopup.css";
import { AppContext } from "../context/appContext";

const ResultPopUp = () => {
  const { reportData, resultData } = useContext(AppContext);

  console.log(`all report data: ${reportData}`);

  return (
    <div className="pop-up-overlay">
      <div className="report-container">
        <h2>Report</h2>
        <div className="report-content">
          <p>Name&nbsp;: </p>
          <p>{reportData.name}</p>
        </div>
        <div className="report-content">
          <p>Age&nbsp;: </p>
          <p>{reportData.age}</p>
        </div>
        <div className="report-content">
          <p>Gender&nbsp;: </p>
          <p>{reportData.gender}</p>
        </div>
        <div className="report-content">
          <p>Result&nbsp;:</p>
          <p>{resultData}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultPopUp;
