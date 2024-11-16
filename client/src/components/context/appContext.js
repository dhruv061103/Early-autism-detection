// AppContext.js
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [person, setPerson] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState();
  const [reportData, setResportData] = useState();
  const [resultData, setResultData] = useState();

  return (
    <AppContext.Provider
      value={{
        person,
        setPerson,
        patientName,
        setPatientName,
        patientAge,
        setPatientAge,
        resultData,
        setResultData,
        reportData,
        setResportData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
