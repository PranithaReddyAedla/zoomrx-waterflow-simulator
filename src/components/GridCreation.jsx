import { Slider, makeStyles, Grid, Button } from "@material-ui/core";
import "./WaterflowSimulator.css";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid black",
    borderRadius: "10px",
    padding: "20px 50px 25px",
    margin: "30px 20px",
  },

  subContainer: {
    maxWidth: 600,
    padding: 10,
    margin: "auto",
  },

  text: {
    textAlign: "left",
    marginBottom: "0px",
  },

  button: {
    width: "150px",
    padding: "10px",
    textAlign: "center",
    color: "white",
    background: "#1976d2",
    borderRadius: "20px",
    margin: "auto",
    marginTop: "30px",
    cursor: "pointer",
    "&:hover": {
      background: "#0e3f6f",
    },
  },
}));

export const GridCreation = (props) => {
  let {
    rowCount,
    columnCount,
    obstaclesCount,
    handleSliderChange,
    handleNextClick,
  } = props;

  const classes = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item className={classes.subContainer} xs={12}>
        {/* <h3>WaterFlow Simulator</h3> */}
        <h5 className={classes.text}>Grid Creation</h5>
        <p className={classes.text}>Number of rows</p>

        <Slider
          aria-label="rowCount"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={10}
          onChange={(e, value) => handleSliderChange(e, value, "rowCount")}
        />
        <div className={classes.text}>{rowCount}</div>

        <p className={classes.text}>Number of columns</p>
        <Slider
          aria-label="columnCount"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={10}
          onChange={(e, value) => handleSliderChange(e, value, "columnCount")}
        />
        <div className={classes.text}>{columnCount}</div>

        <p className={classes.text}>Number of Obstractions</p>
        <Slider
          aria-label="obstaclesCount"
          defaultValue={1}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={10}
          onChange={(e, value) =>
            handleSliderChange(e, value, "obstaclesCount")
          }
        />
        <div className={classes.text}>{obstaclesCount}</div>
        <button
          onClick={() => {
            handleNextClick(true);
          }}
          className={"sharedBtns"}
        >
          Next
        </button>
      </Grid>
    </Grid>
  );
};
