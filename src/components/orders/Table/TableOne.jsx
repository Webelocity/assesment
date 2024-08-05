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
  
  const priorityOrder = ["_id", "customerName", "date", "expected_deliver_date", "total"];
  
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((prev, curr) => prev && prev[curr], obj);
  };
  
  // Handles Table sorting based on given sort options
  const sortedData = () => {
    console.log('sort Options', sortOptions)
    let sortedRows = [...rows];
    
    sortedRows.sort((a, b) => {
      for (let key of priorityOrder) {
        if (sortOptions.hasOwnProperty(key)) {
          const type = sortOptions[key];
          const aValue = getNestedValue(a, key);
          const bValue = getNestedValue(b, key);
  
          if (type === "") continue;
  
          if (
            typeof aValue === "string" &&
            key !== "date" &&
            key !== "expected_deliver_date"
          ) {
            const comparison = aValue.localeCompare(bValue);
            if (comparison !== 0) {
              return type === "ASC" ? comparison : -comparison;
            }
          } else if (typeof aValue === "number") {
            const comparison = aValue - bValue;
            if (comparison !== 0) {
              return type === "ASC" ? comparison : -comparison;
            }
          } else if (key === "date") {
            const comparison = new Date(aValue) - new Date(bValue);
            if (comparison !== 0) {
              return type === "ASC" ? comparison : -comparison;
            }
          } else if (key === "expected_deliver_date") {
            const parseDate = (dateStr) => {
              const [day, month, year] = dateStr.split(" ");
              return new Date(`${month} ${day}, ${year}`).getTime();
            };
            const comparison = parseDate(aValue) - parseDate(bValue);
            if (comparison !== 0) {
              return type === "ASC" ? comparison : -comparison;
            }
          }
        }
      }
      return 0;
    });
  
    return sortedRows;
  };
  
  
  

  // Show sorting options in the console
  useEffect(() => {
    // console.log(sort);
    // Ensure sortOptions state is synchronized with the prop
    console.log('sort Options before', sort);
    if (sort.customerName) {
      sort["userData.name"] = sort.customerName;
      delete sort.customerName;
    }
    console.log('sort Options after', sort);

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
