import React, { useState } from "react";
import styles from "./signup.module.css";

export default function Signup() {
  const initialState = {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    console.log("Signup submitted with:", formData);
    setFormData(initialState);
    setPasswordMatchError("");
  };

  return (
    <div className={styles.Signup}>
      <h2>Create an Account</h2>
      <form className={styles.form} onSubmit={handleSignup}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
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
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
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
        <button type="submit" className={styles.signupButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
