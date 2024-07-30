'use client';

import React, { useState } from 'react';
import './OrdersTableWrapper.scss';
import OrderTableControls from '../orderTopBar/OrderTableControls';
import OrdersTable from '../OrdersTable/OrdersTable';
import { orderSampleData } from '@/utils/ordertableRows';
import EmptyOrders from '../EmptyOrders/EmptyOrders';

const OrderstableWrapper = ({ isEmptyOrders, setIsEmptyOrders }) => {
  const [activeFilter, setActiveFilter] = useState('All Orders');
  const [rows, setRows] = useState(orderSampleData);

  // Function to apply filtering
  const [filter, setFilter] = useState({});

  const applyFilter = (newFilter) => {
    setFilter(newFilter);
  };
  //end of filters states

  // Function to apply sorting
  const [sort, setSort] = useState({});

  const applySort = (newSort) => {
    setSort(newSort);
  };

  // Filter and sort rows based on state
  const filteredRows = () => {
    rows.filter((row) => {
      return Object.keys(filter).every((key) => {
        const filterValue = filter[key];

        // Handle nested objects
        if (key.includes('.')) {
          const [mainKey, subKey] = key.split('.');
          return row[mainKey] && row[mainKey][subKey] === filterValue;
        }

        // Handle date fields
        if (key === 'date' || key === 'expected_deliver_date') {
          const rowDate = new Date(row[key]);
          const filterDate = new Date(filterValue);
          return rowDate
            .toISOString()
            .startsWith(filterDate.toISOString().split('T')[0]);
        }

        // Handle string matching
        if (typeof row[key] === 'string') {
          return row[key].toLowerCase() === filterValue.toLowerCase();
        }

        // Handle numbers
        if (typeof row[key] === 'number') {
          return row[key] === filterValue;
        }

        // Handle any other types or default case
        return row[key] === filterValue;
      });
    });
  };

  return (
    <div className="OrdersTableWrapper">
      {isEmptyOrders ? (
        <EmptyOrders />
      ) : (
        <>
          <OrderTableControls
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onFilterChange={applyFilter}
            onSortChange={applySort}
          />
          <OrdersTable rows={filteredRows()} sort={sort} />
          <div className="bottom-result-count">
            <p>Showing 1-50 of 3,934 orders</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderstableWrapper;
