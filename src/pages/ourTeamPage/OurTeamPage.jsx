import React, { useState } from "react";
import styles from "./ourTeamPage.module.css";

export default function OurTeamPage() {
  const [category, setCategory] = useState("leaders");
  return (
    <div className={styles.OurTeamPage}>
      <h1>Our Team</h1>
      <p>
        Our aim is to create a better world in the floatation industry through
        our innovative and IP driven products and services. Our Team consists of
        a group of engineers from IIT (BHU) Varanasi, having industrial
        experience in Finance, Marketing, Business Development, Administration
        and Research & Development. Professors and Mentors from IIT (BHU)
        Varanasi are technical advisors to our company and guide us to deliver
        quality and technology driven products pertaining to Global Industrial
        Standards.
      </p>

      <div>
        <button>Leaders</button>
        <button>Members</button>
        <button>Advisors</button>
      </div>
      <div></div>
    </div>
  );
}
