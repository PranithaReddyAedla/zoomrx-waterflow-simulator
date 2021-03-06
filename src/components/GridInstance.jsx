import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import GridWithDragDrop from "./GridWithDragDrop";
import SimulatorGrid from "./SimulatorGrid";
import "./WaterflowSimulator.css";

export const GridInstance = (props) => {
  let { rowCount, columnCount, obstaclesCount, handleBackButtonClick } = props;
  function create2DArray(rowCount, columnCount) {
    return Array(rowCount)
      .fill()
      .map(() => Array(columnCount).fill(0));
  }

  const [gridSkelton, setGridSkelton] = useState(
    create2DArray(rowCount, columnCount)
  );
  const [isStartSimulationClicked, setIsStartSimulation] = useState(false);
  const [isStartClicked, setIsStart] = useState(false);
  const [selectedSimulationBox, setSelectedSimulationBox] = useState(undefined);

  const handleSimulationSelection = (indexValue) => {
    setSelectedSimulationBox(indexValue);
  };
  const handleOnClickStartSimulation = (value) => {
    setIsStartSimulation(value);
    console.log(gridSkelton);
  };
  const handleOnClickStart = (value) => {
    setIsStart(value);
    console.log(gridSkelton);
  };
  const handleBackClick = (value) => {
    handleBackButtonClick(value);
  };
  const handleResetClick = (value) => {
    setIsStart(false);
    setSelectedSimulationBox(undefined);
    setIsStartSimulation(false);
    setGridSkelton(create2DArray(rowCount, columnCount));
  };
  const handleSetGridSkelton = (value) => {
    setGridSkelton(value);
    console.log(gridSkelton);
  };

  return (
    <Grid
      container
      style={{ minWidth: 400 }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item className="container" xs={12}>
        <div className="subContainer">
          {!isStartClicked ? (
            <GridWithDragDrop
              obstaclesCount={obstaclesCount}
              gridSkelton={gridSkelton}
              handleSetGridSkelton={handleSetGridSkelton}
              handleOnClickStartSimulation={handleOnClickStartSimulation}
              isStartClicked={isStartClicked}
              handleOnClickStart={handleOnClickStart}
              selectedSimulationBox={selectedSimulationBox}
              handleSimulationSelection={handleSimulationSelection}
              handleBackClick={handleBackClick}
            />
          ) : (
            <SimulatorGrid
              rowCount={rowCount}
              columnCount={columnCount}
              gridSkelton={gridSkelton}
              selectedSimulationBox={selectedSimulationBox}
              handleBackClick={handleBackClick}
              handleSetGridSkelton={handleSetGridSkelton}
              handleResetClick={handleResetClick}
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
};
