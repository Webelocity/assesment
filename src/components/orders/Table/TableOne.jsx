"use client";

import React, { useState, useEffect } from "react";
import "./TableOne.scss";
import { TbArrowsSort } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import { BiMessageRounded } from "react-icons/bi";
import { formatAmount, formatDate, styleStatus } from "@/utils/helpers";
import { Checkbox, IconButton } from "@mui/material";
import { TfiMore } from "react-icons/tfi";
import DateFilterSort from "../Filter/DateFilterSort";

const TableOne = ({ rows, columns, sort }) => {
  const [checked, setChecked] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    date: "DESC", // Default sort by date
    ...sort,
  });

  // handle checkbox click
  const handleCheckBoxClick = (e, id) => {
    e.stopPropagation();
    id !== "All"
      ? setChecked((prev) =>
          checked.includes(id)
            ? checked.filter((checkId) => checkId !== id)
            : [...prev, id]
        )
      : checked.length === rows.length
      ? setChecked([])
      : setChecked(rows.map((col) => col._id));
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((prev, curr) => prev && prev[curr], obj);
  };

  // handles Table sorting based on given sort options
  const sortedData = () => {
    let sortedRows = [...rows];
    for (let key in sortOptions) {
      if (sortOptions.hasOwnProperty(key)) {
        const type = sortOptions[key];
        sortedRows.sort((a, b) => {
          const aValue = getNestedValue(a, key);
          const bValue = getNestedValue(b, key);

          if (
            typeof aValue === "string" &&
            key !== "date" &&
            key !== "expected_deliver_date"
          ) {
            return type === "ASC"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          } else if (typeof aValue === "number") {
            return type === "ASC" ? aValue - bValue : bValue - aValue;
          } else if (key === "date") {
            return type === "ASC"
              ? new Date(aValue) - new Date(bValue)
              : new Date(bValue) - new Date(aValue);
          } else if (key === "expected_deliver_date") {
            // Parse date strings in "15 Feb, 2024" format
            const parseDate = (dateStr) => {
              const [day, month, year] = dateStr.split(" ");
              return new Date(`${month} ${day}, ${year}`).getTime();
            };
            return type === "ASC"
              ? parseDate(aValue) - parseDate(bValue)
              : parseDate(bValue) - parseDate(aValue);
          }
          return 0;
        });
      }
    }
    return sortedRows;
  };

  // Show sorting options in the console
  useEffect(() => {
    // console.log(sort);
    // Ensure sortOptions state is synchronized with the prop
    setSortOptions((prev) => ({
      ...prev,
      ...sort,
    }));
  }, [sort]);

  return (
    <div className="ordersTablesScrollable">
      <table className="toolswiftTable">
        {/* Table Head Columns */}
        <thead>
          <tr>
            {columns?.map((column, index) => (
              <th
                key={index}
                className={column?.isSortable ? "clickable" : ""}
                onClick={() => {
                  if (column.isSortable && column.dataKey !== "date") {
                    const currentKey = column.dataKey;
                    setSortOptions((prev) => ({
                      ...prev,
                      [currentKey]: prev[currentKey] === "ASC" ? "DESC" : "ASC",
                    }));
                  }
                }}>
                {column.dataKey === "date" ? (
                  <DateFilterSort />
                ) : (
                  <span className="th-td-wrapper">
                    {index === 0 && (
                      <Checkbox
                        onClick={(e) => handleCheckBoxClick(e, "All")}
                        checked={checked.length === rows.length}
                      />
                    )}
                    {column?.name}
                    {column?.isSortable ? (
                      <TbArrowsSort className="sortIcon" />
                    ) : (
                      ""
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table Body rows */}
        <tbody>
          {sortedData().map((row) => (
            <tr key={row._id}>
              <td className="bold">
                <span className="th-td-wrapper">
                  <Checkbox
                    onClick={(e) => handleCheckBoxClick(e, row._id)}
                    checked={checked.includes(row._id)}
                  />{" "}
                  #{row?._id}
                </span>
              </td>
              <td>
                <span>
                  <p className="oranged">{row?.userData?.name}</p>
                  <p className="lightTxt">{row?.userData?.type}</p>
                </span>
              </td>
              <td>{formatDate(row.date)}</td>
              <td>{formatDate(row.expected_deliver_date)}</td>
              <td className="bold">${formatAmount(row.total)}</td>
              <td>
                <span className={`badge ${styleStatus(row.payment_status)}`}>
                  <GoDotFill className="icon" /> {row?.payment_status}
                </span>
              </td>
              <td>
                <span className={`badge ${styleStatus(row.order_status)}`}>
                  <GoDotFill className="icon" /> {row.order_status}
                </span>
              </td>
              <td>
                <span>
                  <p>{row?.sales_chanel?.type}</p>
                  <p className="lightTxt">{row?.sales_chanel?.location}</p>
                </span>
              </td>
              <td>
                <span className="actions">
                  <IconButton className="actionBttn">
                    <span className="notifCircle"></span>
                    <BiMessageRounded />
                  </IconButton>
                  <IconButton className="actionBttn">
                    <TfiMore style={{ transform: "rotate(90deg)" }} />
                  </IconButton>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOne;
