import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import "./diagnose.css";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Diagnose = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { person, setPerson, setResportData } = useContext(AppContext);
  const { patientName, setPatientName } = useContext(AppContext);
  const { patientAge, setPatientAge } = useContext(AppContext);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setResportData(data);

    if (data.age < 18) {
      setPerson("child");
      var personType = "child";
    } else {
      setPerson("adult");
      var personType = "adult";
    }
    setPatientAge(data.age);
    setPatientName(data.name);
    navigate(`/diagnose/questions/${personType}`);
    reset();
  };

  return (
    <div className="diagnose-main-container">
      <div className="diagnose-user-detail-form">
        <form onSubmit={handleSubmit(onSubmit)} className="diagnose-form">
          <div className="diagnose-form-header">
            <h3>Patient Personal Details</h3>
          </div>
          <div className="diagnose-form-inputs">
            {/* Name Input */}
            <div className="diagnose-form-input">
              <label className="diagnose-input-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter patient's Name"
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only alphabets are allowed",
                  },
                })}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>

            {/* Age Input */}
            <div className="diagnose-form-input">
              <label className="diagnose-input-label" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                placeholder="Enter patient's age"
                {...register("age", {
                  required: "Age is required",
                  min: {
                    value: 1,
                    message: "Age must be at least 1",
                  },
                  max: {
                    value: 120,
                    message: "Age must be less than or equal to 120",
                  },
                })}
              />
              {errors.age && (
                <p className="error-message">{errors.age.message}</p>
              )}
            </div>

            {/* Gender Input */}
            <div className="diagnose-form-input">
              <label className="diagnose-input-label" htmlFor="gender">
                Gender
              </label>
              <div className="diagnose-form-gender-options">
                <label className="diagnose-option-label">
                  <input
                    type="radio"
                    value="male"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  Male
                </label>
                <label className="diagnose-option-label">
                  <input
                    type="radio"
                    value="female"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  Female
                </label>
                <label className="diagnose-option-label">
                  <input
                    type="radio"
                    value="other"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  Other
                </label>
              </div>
              {errors.gender && (
                <p className="error-message">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="diagnose-form-submit">
            <button type="submit" className="diagnose-submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Diagnose;
