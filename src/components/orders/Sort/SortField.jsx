"use client";

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import GoSortAsc from "../../../../public/assets/GoSortAsc.svg";
import GoSortDesc from "../../../../public/assets/GoSortDesc.svg";
import alphabetSort from "../../../../public/assets/alphabetSort.svg";
import "./SortField.scss";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

export default function SortField({ onChange, reset, fieldName }) {
  const [sort, setSort] = useState("");

  const handleButtonClick = (value) => {
    setSort(value);
    onChange(value);
  };

  const handleReset = () => {
    setSort("");
  };

  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset]);

  return (
    <div className="filter_field">
      <div className="field_head">
        <div className="field_name">{fieldName}</div>
        <Button className="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="sort">
        <Button
          variant="text"
          className={sort === "ASC" ? "selectBttn active" : "selectBttn"}
          onClick={() => handleButtonClick("ASC")}>
          {fieldName === "Customer Name" ? (
            <div className="BttnLabel">
              <Image src={alphabetSort} alt="Sort Icon" />
              Sort A to Z
            </div>
          ) : (
            <div className="BttnLabel">
              <Image src={GoSortAsc} alt="Sort Icon" />
              Sort ascending
            </div>
          )}
          {sort === "ASC" && <FaCheck />}
        </Button>
        <Button
          variant="text"
          className={sort === "DESC" ? "selectBttn active" : "selectBttn"}
          onClick={() => handleButtonClick("DESC")}>
          {fieldName === "Customer Name" ? (
            <div className="BttnLabel">
              <Image src={alphabetSort} alt="Sort Icon" />
              Sort Z to A
            </div>
          ) : (
            <div className="BttnLabel">
              <Image src={GoSortDesc} alt="Sort Icon" />
              Sort descending
            </div>
          )}
          {sort === "DESC" && <FaCheck />}
        </Button>
      </div>
    </div>
  );
}
