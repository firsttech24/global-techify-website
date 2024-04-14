/** @format */

import { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

import { ColorRing } from "react-loader-spinner";

export default function Signup() {
  const initialState = {
    name: "",
    email: "",
    wnumber: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = e => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    console.log("Signup submitted with:", formData);
    setFormData(initialState);
    setPasswordMatchError("");
    registerStudent()
      .then(data => {
        console.log("Student registered successfully:", data);
        localStorage.setItem("gtechify!#", data._id);
        setIsLoading(false);
        navigate("/user/profile");
      })
      .catch(error => {
        console.error("Failed to register student:", error);
      });
  };

  const registerStudent = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/auth/user/set`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register student");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error registering student:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSignup} className={styles.form}>
      <p className={`bigText ${styles.title}`}>Sign Up | Student</p>
      <div className={styles.formBody}>
        <div className={styles.formRow}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="wnumber"
            placeholder="Whatsapp No."
            value={formData.wnumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formRow}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={`btn1 ${styles.btn}`}>
          {!isLoading && "Submit"}
          {isLoading && (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </button>
      </div>
    </form>
  );
}
