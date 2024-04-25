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

  // Function to handle form input changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle submit
  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };
  // data-aos="fade-up"
  return (
    <div className={styles.ContactPage}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          <textarea
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

      <div className={styles.imgContainer}>
        <img src={contact} alt="contact" />
      </div>
    </div>
  );
}
// data-aos="fade-left"
