import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  // Static login handler
  const onSubmit = (data) => {
    const userName = data.username;
    const userPassword = data.password;

    if (userName === "username" && userPassword === "userpassword") {
      localStorage.setItem("authToken", "This_is_the_auth_token");
      toast.success("Login successful!", { position: "top-right" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("Invalid username or password", { position: "top-right" });
    }

    reset(); // Reset the form after submission
  };

  return (
    <div className="login-main-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login-form">
            <h2>Login</h2>
            <div className="login-inputs">
              <div className="login-input-field">
                <input
                  className="login-input"
                  type="text"
                  placeholder="Enter username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <p className="error-message">{errors.username.message}</p>
                )}
              </div>

              <div className="login-input-field">
                <input
                  className="login-input"
                  type="password"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <p className="error-message">{errors.password.message}</p>
                )}
              </div>

              <button className="submit-button" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
