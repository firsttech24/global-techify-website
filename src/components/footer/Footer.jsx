import React from "react";
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export default function Footer() {
  return (
    <div className={styles.Footer}>
      {/* footer one */}
      <div className={styles.footerOne}>
        <div className={styles.left}>
          <p className={`normalText`}>Find us</p>
          <address className={`minorText`}>
            IIT BHU Varanasi, Uttar Pradesh , India
          </address>
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
              <a href="/">
                <li>
                  <FaSquareXTwitter />
                </li>
              </a>
              <a href="/">
                <li>
                  <FaFacebookSquare />
                </li>
              </a>
              <a href="/">
                <li>
                  <FaInstagramSquare />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div className={styles.middle}>
          <p className={`normalText ${styles.heading}`}>Useful links</p>
          <div className={styles.linksContainer}>
            <div className={styles.linksOne}>
              <Link to={"/"} className={`minorText`}>
                Home
              </Link>
              <Link to={"/"} className={`minorText`}>
                About
              </Link>
              <Link to={"/"} className={`minorText`}>
                Services
              </Link>
            </div>
            <div className={styles.linksTwo}>
              <Link to={"/"} className={`minorText`}>
                Mentor
              </Link>
              <Link to={"/"} className={`minorText`}>
                Contact
              </Link>
              <Link to={"/"} className={`minorText`}>
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
              />
              <IoSend />
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
