import React from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-scroll";
import githubIcon from "../../assets/footage/github.png";
import linkedInIcon from "../../assets/footage/linkedin.png";

const Footer = () => {
  const menuItems = [
    "Home",
    "About",
    "Favorites",
    "Menu",
    "Location",
    "Impressum",
  ];

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
          <div>
            Sounds By{" "}
            <a
              href="https://www.zapsplat.com/"
              target="_blank"
              rel="noreferrer"
            >
              Zapsplat
            </a>
          </div>
          <div>
            Food sticker icons by{" "}
            <a
              href="https://www.figma.com/@fifilaw"
              target="_blank"
              rel="noreferrer"
            >
              Fifilaw
            </a>
          </div>
          <div>
            Videos and Images Credits sourced with Pexels and Unsplash{" "}
            <a
              href="https://docs.google.com/document/d/1KnH6ta8vC1Yu_qs8EO2xNgYbtA7lcUFKKsNTyX25_Xg/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </a>
          </div>
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
