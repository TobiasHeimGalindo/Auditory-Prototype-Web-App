import React from "react";
import styles from "./Footer.module.scss";

import githubIcon from "../assets/footage/github.png";
import linkedInIcon from "../assets/footage/linkedin.png";

const Footer = () => {
  const menuItems = ["About", "Favorites", "Menu", "Location", "Impressum"];

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.icons}>
          <a
            href="https://github.com/TobiasHeimGalindo/Auditory-Prototype-Web-App"
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubIcon} alt="GitHub" className={styles.icon} />
          </a>
          <a
            href="https://www.linkedin.com/in/tobias-heim-galindo-a9b173258/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedInIcon} alt="LinkedIn" className={styles.icon} />
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.credits}>
          Sounds By Zapsplat, Videos and Images by XY
        </div>
        <nav className={styles.menu}>
          {menuItems.map((item, index) => (
            <a key={index} href={`/`}>
              {" "}
              {/*TODO: click -> scrolls up to section of the app.js*/}
              {item}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
