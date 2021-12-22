import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import "./WaterflowSimulator.css";

export default function GridWithDragDrop(props) {
  let {
    obstaclesCount,
    gridSkelton,
    handleSetGridSkelton,
    isStartSimulationClicked,
    handleOnClickStartSimulation,
    handleOnClickStart,
    selectedSimulationBox,
    handleSimulationSelection,
    handleBackClick,
  } = props;

  const [placedObstaclesCount, setPlacedObstaclesCount] = useState(0);
  const [dragSuccess, setDragSuccess] = useState(false);
  const [isInit, setIsInit] = useState(true);

  let dragStart = (event) => {
    // event.preventDefault();
    setDragSuccess(false);
  };

  let drop = (event) => {
    event.preventDefault();
    if (event.target.className !== "fillGridBox") {
      event.target.className = "fillGridBox";
      setDragSuccess(true);
      let array = gridSkelton;
      array[event.target.getAttribute("row")][
        event.target.getAttribute("col")
      ] = 2;
      handleSetGridSkelton(array);
      setPlacedObstaclesCount(placedObstaclesCount + 1);
    }
  };

  let dragOver = (event) => {
    event.preventDefault();
  };

  let dragEnd = (event) => {
    event.preventDefault();
    if (dragSuccess) {
      event.target.draggable = false;
      event.target.style.background = "#fffff";
      event.target.className = "empty";
    }
  };

  let onClickStartSimulation = () => {
    setIsInit(false);
    handleOnClickStartSimulation(true);
  };

  return (
    <>
      <p className="subHed">
        {!isStartSimulationClicked
          ? "Drag the obstructions and place it inside the grid"
          : "Select the waterflow start point by clicking on any of blue boxes"}
      </p>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          {gridSkelton.map((row, rowIndex) => {
            // if (rowIndex === gridSkelton.length - 1) return "";
            if (rowIndex === 0 && isInit) return "";
            if (rowIndex === 0 && (selectedSimulationBox == undefined) | null)
              return (
                <div key={rowIndex} className={"selectSection"}>
                  {row.map((column, columnIndex) => (
                    <span
                      key={columnIndex}
                      className="selectGridBox"
                      onClick={() => handleSimulationSelection(columnIndex)}
                    />
                  ))}
                </div>
              );
            if (rowIndex === 0 && (selectedSimulationBox !== undefined) | null)
              return (
                <div key={rowIndex} className="selectSection">
                  {row.map((column, columnIndex) => {
                    return columnIndex === selectedSimulationBox ? (
                      <span key={columnIndex} className="selectedBox" />
                    ) : (
                      <span key={columnIndex} className="selectedEmptyBox" />
                    );
                  })}
                </div>
              );
          })}
          {gridSkelton.map((row, rowIndex) => {
            return (
              <div key={rowIndex} tabIndex={rowIndex} style={{ height: 30 }}>
                {row.map((column, columnIndex) => (
                  <span
                    key={columnIndex}
                    row={rowIndex}
                    col={columnIndex}
                    className="emptyGridBox"
                    onDrop={drop}
                    onDragOver={dragOver}
                  />
                ))}
              </div>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={3}>
          {[...Array(obstaclesCount)].map((obs) => (
            <div
              onDragStart={dragStart}
              onDragEnd={dragEnd}
              className="fill"
              draggable
            />
          ))}
        </Grid>
      </Grid>

      <br />
      <br />

      <button className={"sharedBtns"} onClick={() => handleBackClick(false)}>
        Back
      </button>

      {isInit ? (
        <button
          className={"sharedBtns"}
          disabled={placedObstaclesCount === 0 ? true : false}
          onClick={() => onClickStartSimulation(true)}
        >
          Start simulation
        </button>
      ) : (
        <button
          className={"sharedBtns"}
          onClick={() => {
            handleOnClickStart(true);
          }}
        >
          Start
        </button>
      )}
    </>
  );
}
