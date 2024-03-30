/** @format */

import { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    console.log("Signup submitted with:", formData);
    setFormData(initialState);
    setPasswordMatchError("");
    registerStudent()
      .then((data) => {
        console.log("Student registered successfully:", data);
         localStorage.setItem("gtechify!#", data._id);
        navigate("/user/profile");
      })
      .catch((error) => {
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
    <div className={styles.Signup}>
      <h2>Create an Account</h2>
      <form
        className={styles.form}
        onSubmit={handleSignup}>
        <div className={styles.formGroup}>
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="wnumber">Whatsapp Number</label>
          <input
            type="tel"
            id="wnumber"
            name="wnumber"
            value={formData.wnumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {passwordMatchError && (
          <p style={{ color: "red" }}>{passwordMatchError}</p>
        )}
        <button
          type="submit"
          className={styles.signupButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
