import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-scroll";
import githubIcon from "../../assets/footage/github.png";
import linkedInIcon from "../../assets/footage/linkedin.png";

const Footer = () => {
  const menuItems = ["Home", "About", "Favorites", "Menu", "Location", "Impressum"];

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
            <Link
              key={index}
              to={`${item.toLowerCase()}-section`}
              smooth={true}
              duration={500}
              className={styles.link}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
