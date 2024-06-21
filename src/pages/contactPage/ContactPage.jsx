import React, { useState } from "react";
import styles from "./contactPage.module.css";

import contact from "./../../assets/contact/contact.png";

export default function ContactPage() {
  // State to store form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_HOST_API}/portal/mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if(!response.ok) {
        alert("server error");
        throw new Error("Internal Server Error");
      }
      alert("Thanks! we will contact you soon...");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
    }
    console.log(formData);
  };

  return (
    <div className={styles.ContactPage}>
      <form data-aos="fade-up" onSubmit={handleSubmit} className={styles.form}>
        <h1>Contact</h1>
        <p className="normalText">Have any queries? We're Here To Help</p>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            id="message"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className={`btn1`}>
          Submit
        </button>
      </form>

      <div data-aos="fade-left" className={styles.imgContainer}>
        <img src={contact} alt="contact" />
      </div>
    </div>
  );
}
