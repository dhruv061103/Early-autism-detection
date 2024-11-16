import React, { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import axios from "axios";
import "./adultquestions.css";
import adultQuestions from "./adultQuestions"; // Ensure this file exports an array of adult questions
import childQuestions from "./childQuestions"; // Ensure this file exports an array of child questions
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const { person, patientName, patientAge, setResultData } =
    useContext(AppContext);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scores = {
      A1: formData.A1_Score === "yes" ? 1 : 0,
      A2: formData.A2_Score === "yes" ? 1 : 0,
      A3: formData.A3_Score === "yes" ? 1 : 0,
      A4: formData.A4_Score === "yes" ? 1 : 0,
      A5: formData.A5_Score === "yes" ? 1 : 0,
      A6: formData.A6_Score === "yes" ? 1 : 0,
      A7: formData.A7_Score === "yes" ? 1 : 0,
      A8: formData.A8_Score === "yes" ? 1 : 0,
      A9: formData.A9_Score === "yes" ? 1 : 0,
      A10: formData.A10_Score === "yes" ? 1 : 0,
    };

    // Sum of A1 to A10 scores
    const resultSum = Object.values(scores).reduce(
      (acc, score) => acc + score,
      0
    );

    // Create input data for the API based on the person type
    let inputData;

    if (person === "adult") {
      inputData = {
        ...scores,
        age: patientAge,
        Sex:
          formData.Sex === "male"
            ? "m"
            : formData.Sex === "female"
            ? "f"
            : "o",
        Ethnicity: formData.ethnicity || "Asian",
        austim: formData.austim === "yes" ? "yes" : "no",
        contry_of_res: formData.contry_of_res || "United States",
        used_app_before: formData.used_app_before === "yes" ? "yes" : "no",
        age_desc: formData.age_desc || "Infant (0-2 years)",
        relation: formData.relation || "Parent",
        result: resultSum, // Adult-specific key
      };
    } else if (person === "child") {
      inputData = {
        ...scores,
        Age_Mons: patientAge, // For children, age in months
        Qchat_10_Score: resultSum,
        Sex:
          formData.Sex === "male"
            ? "m"
            : formData.Sex === "female"
            ? "f"
            : "o",
        Ethnicity: formData.ethnicity || "Asian",
        Jaundice: formData.jaundice === "yes" ? "yes" : "no",
        Family_mem_with_ASD: formData.family_asd === "yes" ? "yes" : "no",
        "Who completed the test": formData.relation || "Parent",
        "Class/ASD Traits": formData.asd_traits || "no",
      };
    }

    try {
      console.log("form data", formData);
      console.log("input data: ", inputData);
      const apiUrl =
        person === "adult"
          ? "http://127.0.0.1:5000/predict/adult"
          : "http://127.0.0.1:5000/predict/child";

      const response = await axios.post(apiUrl, {
        inputData,
      });

      setApiResponse(response.data);
      setResultData(response.data.message);
      navigate("/diagnose/questions/report");
    } catch (error) {
      setApiError(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="diagnose-questions-main-container">
      <div className="diagnose-main-form-container">
        <div className="diagnose-questions-main-form">
          <div className="diagnose-questions-header">
            <h2>
              {/* {person === "adult" ? "Adult" : "Child"}  */}
              Questions for {patientName}
            </h2>
          </div>

          <div className="diagnose-question-form-container">
            <form className="diagnose-questions-form" onSubmit={handleSubmit}>
              {/* Render the appropriate questions */}
              {(person === "adult" ? adultQuestions : childQuestions).map(
                (question, index) => (
                  <div key={question.id} className="diagnose-question-input">
                    <p>
                      {index + 1}. {question.question}
                    </p>
                    <div className="diagnose-question-option">
                      {question.type === "radio" &&
                        question.options.map((option) => (
                          <div key={option}>
                            <input
                              type="radio"
                              id={`${question.name}-${option.toLowerCase()}`}
                              name={question.name}
                              value={option.toLowerCase()}
                              onChange={handleInputChange}
                              className="radio-input-options"
                            />
                            <label
                              htmlFor={`${
                                question.name
                              }-${option.toLowerCase()}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      {question.type === "number" && (
                        <input
                          type="number"
                          name={question.name}
                          onChange={handleInputChange}
                          className="number-input"
                        />
                      )}
                      {question.type === "dropdown" && (
                        <select
                          name={question.name}
                          onChange={handleInputChange}
                        >
                          {question.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {question.type === "text" && (
                        <input
                          type="text"
                          name={question.name}
                          onChange={handleInputChange}
                        />
                      )}
                    </div>
                  </div>
                )
              )}

              <div className="diagnose-question-submit">
                <button
                  type="submit"
                  className="diagnose-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>

            {/* Display API Response */}
            {apiResponse && (
              <div className="api-response">
                <h3>Prediction Result</h3>
                <p>{JSON.stringify(apiResponse)}</p>
              </div>
            )}

            {/* Display API Error */}
            {apiError && (
              <div className="api-error">
                <p>Error: {apiError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
