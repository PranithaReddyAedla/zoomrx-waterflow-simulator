import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import "./WaterflowSimulator.css";

export default function SimulatorGrid(props) {
  const {
    rowCount,
    columnCount,
    gridSkelton,
    selectedSimulationBox,
    handleBackClick,
    handleSetGridSkelton,
    handleResetClick,
  } = props;
  const [loader, setLoader] = useState(true);

  var newColumn = [];

  useEffect(() => {
    let loader = mainF(0, [selectedSimulationBox]);
    handleSetGridSkelton(gridSkelton);
    setLoader(loader);
  }, []);

  let leftNode = (row, column, gridSkeltonArray) => {
    if (gridSkeltonArray[row][column] !== 2) {
      gridSkeltonArray[row][column] = 1;
      if (gridSkeltonArray[row + 1][column] !== 2) {
        newColumn.push(column);
      } else if (column - 1 >= 0) leftNode(row, column - 1, gridSkeltonArray);
    }

    return gridSkeltonArray;
  };

  let rightNode = (row, column, gridSkeltonArray) => {
    if (gridSkeltonArray[row][column] !== 2) {
      gridSkeltonArray[row][column] = 1;
      if (gridSkeltonArray[row + 1][column] !== 2) {
        newColumn.push(column);
      } else {
        if (column + 1 < columnCount)
          rightNode(row, column + 1, gridSkeltonArray);
      }
    }
    return gridSkeltonArray;
  };

  let mainF = (row, column) => {
    let simulatorGridArray = gridSkelton;
    newColumn = [];
    column.map((col) => (simulatorGridArray[row][col] = 1));
    column.map((col) => {
      simulatorGridArray[row][col] = 1;
      if (row !== rowCount - 1) {
        if (simulatorGridArray[row + 1][col] !== 2) newColumn.push(col);
        else {
          if (col < columnCount - 1)
            simulatorGridArray = rightNode(row, col + 1, simulatorGridArray);
          if (col > 0)
            simulatorGridArray = leftNode(row, col - 1, simulatorGridArray);
        }
        handleSetGridSkelton(simulatorGridArray);
      }
    });
    if (row < rowCount - 1) mainF(++row, newColumn);
    return false;
  };

  if (loader) return null;

  return (
    <Grid container justifyContent="center" alignItems="center">
      <p className="subHed"></p>
      <Grid item xs={12} sm={10}>
        {gridSkelton.map((row, rowIndex) => {
          if (rowIndex === 0)
            return (
              <div key={rowIndex} style={{ height: 30 }}>
                {row.map((column, columnIndex) => {
                  return columnIndex == selectedSimulationBox ? (
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
            <div style={{ height: 30 }}>
              {row.map((column, columnIndex) =>
                gridSkelton[rowIndex][columnIndex] === 0 ? (
                  <span className="block bd whiteBlock" />
                ) : gridSkelton[rowIndex][columnIndex] === 2 ? (
                  <span className="block bd obsBlock" />
                ) : (
                  <span className="block waterBlock bd" />
                )
              )}
            </div>
          );
        })}
        {gridSkelton.map((row, rowIndex) => {
          if (rowIndex === rowCount - 1)
            return (
              <div key={rowIndex} style={{ height: 30 }}>
                {row.map((column, columnIndex) => {
                  return gridSkelton[rowIndex][columnIndex] ? (
                    <span key={columnIndex} className="selectedBox" />
                  ) : (
                    <span key={columnIndex} className="selectedEmptyBox" />
                  );
                })}
              </div>
            );
        })}
      </Grid>
      <Grid item xs={12} sm={2}></Grid>

      <Grid item xs={12} sm={12}>
        <br />
        <button className={"sharedBtns"} onClick={() => handleBackClick(true)}>
          Back
        </button>
        <button className={"sharedBtns"} onClick={() => handleResetClick(true)}>
          Reset
        </button>
      </Grid>
    </Grid>
  );
}
