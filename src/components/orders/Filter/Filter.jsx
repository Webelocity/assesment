"use client";

import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import "./Filter.scss";
import { GoFilter } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import StatusSelect from "./FilterComponents/StatusSelect";
import DateRange from "./FilterComponents/DateRange";
import CustomerType from "./FilterComponents/CustomerType";
import SalesChannel from "./FilterComponents/SalesChannel";

export default function Filter({ onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [filterValues, setFilterValues] = useState({
    status: "",
    dateRange: { start: null, end: null },
    customerType: "",
    salesChannel: "",
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
      status: "",
      dateRange: { start: null, end: null },
      customerType: "",
      salesChannel: "",
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
        aria-describedby="Filter"
        variant="contained"
        onClick={handleClick}
        id="Filter_Button"
        className="mainBttn white noshadow">
        <GoFilter />
        Filter
      </Button>
      <Popover
        id="Filter"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <div className="upper">
          <div className="head">
            <p>Filter by</p>
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
          />
          <StatusSelect
            reset={reset}
            onChange={(value) =>
              setFilterValues((prev) => ({ ...prev, status: value }))
            }
          />
          <CustomerType
            reset={reset}
            onChange={(value) =>
              setFilterValues((prev) => ({ ...prev, customerType: value }))
            }
          />
          <SalesChannel
            reset={reset}
            onChange={(value) =>
              setFilterValues((prev) => ({ ...prev, salesChannel: value }))
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
