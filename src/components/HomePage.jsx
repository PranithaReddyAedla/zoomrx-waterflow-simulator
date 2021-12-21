import React, { useState } from "react";
import { GridCreation } from "./GridCreation";
import { Grid } from "@material-ui/core";
import "../App.css";
import { GridInstance } from "./GridInstance";

// const useStyles = makeStyles((theme) => ({
//   container: {
//     border: "1px solid black",
//     borderRadius: "10px",
//     padding: "20px 50px 25px",
//     margin: "30px 20px",
//   },

//   subContainer: {
//     maxWidth: 400,
//     padding: 10,
//     margin: "auto",
//   },

//   text: {
//     textAlign: "left",
//     marginBottom: "0px",
//   },

//   button: {
//     width: "150px",
//     padding: "10px",
//     textAlign: "center",
//     color: "white",
//     background: "#1976d2",
//     borderRadius: "20px",
//     margin: "auto",
//     marginTop: "30px",
//     cursor: "pointer",
//     "&:hover": {
//       background: "#0e3f6f",
//     },
//   },
// }));

export const HomePage = () => {
  const [rowCount, setRowCount] = useState(1);
  const [columnCount, setColumnCount] = useState(1);
  const [obstaclesCount, setObstaclesCount] = useState(1);
  const [isInitialCounts, setUserSelectedCounts] = useState(false);

  //   const classes = useStyles();

  const handleSliderChange = (event, selectedValue, slider) => {
    if (slider === "columnCount") {
      setColumnCount(selectedValue);
    } else if (slider === "rowCount") {
      console.log(selectedValue);
      setRowCount(selectedValue);
    } else {
      setObstaclesCount(selectedValue);
    }
  };

  const handleNextClick = (value) => {
    setUserSelectedCounts(true);
  };

  const handleBackButtonClick = (value) => {
    setUserSelectedCounts(false);
    setRowCount(1);
    setColumnCount(1);
    setObstaclesCount(1);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <h2 style={{ margin: "10px 0" }}>WaterFlow Simulator</h2>

      {!isInitialCounts ? (
        <GridCreation
          rowCount={rowCount}
          columnCount={columnCount}
          obstaclesCount={obstaclesCount}
          handleSliderChange={handleSliderChange}
          handleNextClick={handleNextClick}
        />
      ) : (
        <GridInstance
          rowCount={rowCount}
          columnCount={columnCount}
          obstaclesCount={obstaclesCount}
          handleBackButtonClick={handleBackButtonClick}
        />
      )}
    </Grid>
  );
};
