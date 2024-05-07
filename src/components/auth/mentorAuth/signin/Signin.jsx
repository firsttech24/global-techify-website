import React, { useState } from "react";
import styles from "./../../studentAuth/signin/signin.module.css";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    login()
      .then(data => {
        console.log("Student registered successfully:", data);
      })
      .catch(error => {
         localStorage.setItem(
           "gtechify!#",
           JSON.stringify({ id: data.user._id, role: "mentor" })
         );
         navigate("/mentor/meetrequests");
        console.error("Failed to register student:", error);
      });
  };

  const login = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/auth/mentor/get`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        alert(response.json().message);
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={`bigText ${styles.title}`}>Sign In | Mentor</p>
      <div className={styles.formBody}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className={`btn1 ${styles.btn}`}>
          Submit
        </button>
      </div>
    </form>
  );
}
