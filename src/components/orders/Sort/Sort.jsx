"use client";

import React, { useEffect, useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import "../Filter/Filter.scss";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SortField from "./SortField";
import { TbArrowsSort } from "react-icons/tb";

export default function Sort({ onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [sortValues, setSortValues] = useState({
    _id: "",
    date: "",
    customerName: "",
    expected_deliver_date: "",
    total: "",
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
    setSortValues({
      _id: "",
      date: "",
      customerName: "",
      expected_deliver_date: "",
      total: "",
    });
    setReset(true);
    // reset the flag after a short delay
    setTimeout(() => setReset(false), 100);
  };

  // Apply Filters Button Function
  const applySorts = () => {
    handleClose();
    onChange(sortValues);
  };

  return (
    <div>
      <Button
        aria-describedby="Sort"
        variant="contained"
        onClick={handleClick}
        id="Sort_Button"
        className="mainBttn white noshadow">
        <TbArrowsSort />
        Sort
      </Button>
      <Popover
        id="Sort"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
        }}>
        <div className="upper">
          <div className="head">
            <p>Sort by</p>
            <IoIosCloseCircleOutline
              onClick={handleClose}
              className="close_button"
            />
          </div>
          <SortField
            fieldName={"Order ID"}
            reset={reset}
            onChange={(value) =>
              setSortValues((prev) => ({ ...prev, _id: value }))
            }
          />
          <SortField
            fieldName={"Date Placed"}
            reset={reset}
            onChange={(value) =>
              setSortValues((prev) => ({ ...prev, date: value }))
            }
          />
          <SortField
            fieldName={"Customer Name"}
            reset={reset}
            onChange={(value) =>
              setSortValues((prev) => ({ ...prev, customerName: value }))
            }
          />
          <SortField
            fieldName={"Preferred Fulfilment"}
            reset={reset}
            onChange={(value) =>
              setSortValues((prev) => ({
                ...prev,
                expected_deliver_date: value,
              }))
            }
          />
          <SortField
            fieldName={"Total"}
            reset={reset}
            onChange={(value) =>
              setSortValues((prev) => ({ ...prev, total: value }))
            }
          />
        </div>
        <div className="lower">
          <Button className="mainBttn white" onClick={handleReset}>
            Reset
          </Button>
          <Button className="mainBttn black" onClick={applySorts}>
            Apply Now
          </Button>
        </div>
      </Popover>
    </div>
  );
}
