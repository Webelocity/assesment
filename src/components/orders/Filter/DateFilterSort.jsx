"use client";

import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import "./Filter.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DateRange from "./FilterComponents/DateRange";
import { TbArrowsSort } from "react-icons/tb";
import SortField from "../Sort/SortField";

export default function DateFilterSort({ onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [filterValues, setFilterValues] = useState({
    dateRange: { start: null, end: null },
    dateSort: "",
  });

  //* MUI Popover functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //*

  //Reset Button Function and State
  const [reset, setReset] = useState(false);
  const handleReset = () => {
    setFilterValues({
      dateRange: { start: null, end: null },
    });
    setReset(true);
    // reset the flag after a short delay
    setTimeout(() => setReset(false), 100);
  };

  // Apply Filters Button Function
  const applyFilter = () => {
    handleClose();
    onChange(filterValues);
  };

  return (
    <div>
      <Button
        aria-describedby="DateFilter"
        variant="contained"
        onClick={handleClick}
        id="DateFilter_Button"
        className="transparentBttn noshadow">
        Date Placed
        <TbArrowsSort className="sortIcon" />
      </Button>
      <Popover
        id="DateFilter"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
        }}>
        <div className="upper">
          <div className="head">
            <p>Date Placed</p>
            <IoIosCloseCircleOutline
              onClick={handleClose}
              className="close_button"
            />
          </div>
          <DateRange
            reset={reset}
            onChange={(value) =>
              setFilterValues((prev) => ({ ...prev, dateRange: value }))
            }
            Datesort={true}
          />
          <SortField
            fieldName={"Sort Date"}
            reset={reset}
            onChange={(value) =>
              setFilterValues((prev) => ({ ...prev, dateSort: value }))
            }
          />
        </div>
        <div className="lower">
          <Button className="mainBttn white" onClick={handleReset}>
            Reset
          </Button>
          <Button className="mainBttn black" onClick={applyFilter}>
            Apply Now
          </Button>
        </div>
      </Popover>
    </div>
  );
}
