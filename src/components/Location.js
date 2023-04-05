import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import styles from "./Location.module.scss";


const addressContent = [
  { text: "Restaurant Name", variant: "h5" },
  { text: "70806 Mühlheim Straße 8,", mt: 2 },
  { text: "Kornwestheim, Baden Würrtemberg" },
  { text: "(+49) 123 456790", mt: 2 },
  { text: "Hours:", mt: 2 },
  { text: "Mon-Fri: 2.30 - 9pm" },
  { text: "Sat-Sun: 2.30 - 10pm" },
];

const Location = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftWrapper}>
          <div className={styles.headerText}>
            <h2>Location</h2>
            <p>Visit us in Kornwestheim :)</p>
          </div>
          <Card
            className={styles.addressCard}
            sx={{ boxShadow: "10px 0px 0px 0px #494bea" }}
          >
            <CardContent>
              {addressContent.map(({ text, variant, mt }, index) => (
                <Box key={index} mt={mt || 0}>
                  <Typography variant={variant || "body1"}>{text}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className={styles.googleMaps}></div>
      </div>
    </div>
  );
};

export default Location;
