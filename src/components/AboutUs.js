import React from "react";
import styles from './AboutUs.module.scss';

import video from '../assets/footage/journey.mp4';

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.journey}>
        <h2>Our Journey</h2>
        <p>
          Founded by a passionate chef, our restaurant is a dream to share the
          flavors of Japan. Join us on our journey and experience the artistry
          of Japanese cuisine
        </p>
      </div>
      <div className={styles.rectangle}>
        <video
          className={styles.video}
          src={video}
          playsInline
          autoPlay
          muted
          loop
        ></video>
      </div>
    </div>
  );
};

export default AboutUs;
