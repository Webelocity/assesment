"use client";

import React from "react";
import "./OrderTableControls.scss";
import { filterStats } from "@/utils/filtersStatus";
import Filter from "@/components/orders/Filter/Filter";
import Sort from "../Sort/Sort";

const demoStats = [
  {
    name: "All Orders",
    count: 3934,
  },
  {
    name: "Pending",
    count: 2,
  },
  {
    name: "In Fulfilment",
    count: 3,
  },
  {
    name: "Delivered",
    count: 100,
  },
  {
    name: "Cancelled",
    count: 200,
  },
  {
    name: "Draft",
    count: 193,
  },
];

const OrderTableControls = ({
  activeFilter,
  setActiveFilter,
  onFilterChange,
  onSortChange,
}) => {
  const getStatusCount = (filterName) => {
    const exactMatch = demoStats.find((stat) => stat.name === filterName);

    return exactMatch ? exactMatch?.count || 0 : 0;
  };

  const handleFilterChange = (newFilter) => {
    onFilterChange(newFilter);
  };
  const handleSortChange = (newSort) => {
    onSortChange(newSort);
  };

  return (
    <div className="topTableControler">
      <div className="leftFilters">
        {filterStats.map((tab, index) => (
          <span
            key={index}
            className={`filterTab ${
              activeFilter === tab?.name ? "active" : ""
            }`}
            onClick={() => setActiveFilter(tab.name)}>
            {tab.name}
            <span className={`numberBadge ${tab.name.split(" ")[0]}`}>
              {getStatusCount(tab.name)}
            </span>
          </span>
        ))}
      </div>
      <div className="rightControls">
        <Filter onChange={handleFilterChange} />
        <Sort onChange={handleSortChange} />
      </div>
    </div>
  );
};

export default OrderTableControls;
