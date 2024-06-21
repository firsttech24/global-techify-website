import React, { useState } from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

import { IoLogoLinkedin } from "react-icons/io5";
import { FaYoutubeSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function Footer({ role }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST_API}/portal/mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify({
            email
          })
        }
      );
      if(!response.ok) {
        alert("server error");
        throw new Error("internal server error");
      }
      alert("Thanks! We will contact you soon...");
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.Footer}>
      {/* footer one */}
      <div className={styles.footerOne}>
        <div className={styles.left}>
          <p className={`normalText`}>Find us</p>
          <a href={"https://maps.app.goo.gl/UMYUtHV4jdTUPMDq6"} target="_blank">
            <address className={`minorText`}>
              IIT BHU Varanasi, Uttar Pradesh , India
            </address>
          </a>
        </div>
        <div className={styles.middle}>
          <p className={`normalText`}>Call us</p>
          <a href="tel:+919651609214" className={`minorText`}>
            +919651609214
          </a>
        </div>
        <div className={styles.right}>
          <p className={`normalText`}>Mail us</p>
          <a
            href="mailto:global.techify.info@gmail.com"
            className={`minorText`}
          >
            global.techify.info@gmail.com
          </a>
        </div>
      </div>

      {/* footer two */}
      <div className={styles.footerTwo}>
        <div className={styles.left}>
          <div className={styles.leftTop}>
            <p className={styles.logo}>Global Techify</p>
            <p className={`minorText`}>
              Global Techify provides mentorship to students who want to stay
              updated with the latest trends in technology by connecting with
              industry experts, students can get valuable insights into the tech
              industry.
            </p>
          </div>
          <div className={styles.leftDown}>
            <p className={`normalText`}>Follow us</p>
            <ul className={styles.socialContainer}>
              {/* instagram */}
              <a
                href="https://instagram.com/globaltechify?igshid=MzNlNGNkZWQ4Mg=="
                target="_blank"
              >
                <li>
                  <FaInstagramSquare />
                </li>
              </a>

              {/* facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100093936788890&mibextid=ZbWKwL"
                target="_blank"
              >
                <li>
                  <FaFacebookSquare />
                </li>
              </a>

              {/* linkedin */}
              <a
                href="https://www.linkedin.com/company/global-techify/"
                target="_blank"
              >
                <li>
                  <IoLogoLinkedin />
                </li>
              </a>

              {/* youtube */}
              <a
                href="https://youtube.com/@GlobalTechify-ze6sh"
                target="_blank"
              >
                <li>
                  <FaYoutubeSquare />
                </li>
              </a>

              {/* twitter */}
              <a
                href="https://twitter.com/GlobalTechify?t=7itLOm-jLsje--ejqLqXtg&s=08"
                target="_blank"
              >
                <li>
                  <FaSquareXTwitter />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className={styles.middle}>
          <p className={`normalText ${styles.heading}`}>Useful links</p>
          <div className={styles.linksContainer}>
            <div className={styles.linksOne}>
              <Link to={"/"} onClick={scrollToTop} className={`minorText`}>
                Home
              </Link>
              <Link to={"/about"} onClick={scrollToTop} className={`minorText`}>
                About
              </Link>
              <Link
                to={"/services"}
                onClick={scrollToTop}
                className={`minorText`}
              >
                Services
              </Link>
            </div>
            <div className={styles.linksTwo}>
              <Link
                to={role === "mentor" ? "/mentor/meetrequests" : "/auth"}
                onClick={scrollToTop}
                className={`minorText`}
              >
                Mentor
              </Link>
              <Link
                to={"/contact"}
                onClick={scrollToTop}
                className={`minorText`}
              >
                Contact
              </Link>
              <Link to={"/team"} onClick={scrollToTop} className={`minorText`}>
                Our team
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <p className={`normalText ${styles.heading}`}>Subscribe</p>
          <div className={styles.container}>
            <p className={`minorText`}>
              Don't miss to subscribe to our new feeds, kindly fill the form
              below.
            </p>
            {/* search */}
            <div className={styles.searchContainer}>
              <input
                type="email"
                className={styles.input}
                placeholder="Email address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <IoSend onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      {/* footer three */}
      <div className={styles.footerThree}>
        Copyright © 2024, All Right Reserved <a href="/"> Global Techify</a>
      </div>
    </div>
  );
}
