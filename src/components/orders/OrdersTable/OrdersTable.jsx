import React, { useEffect, useState } from "react";
import "./OrdersTable.scss";
import { CiSearch } from "react-icons/ci";
import { columns, orderSampleData } from "@/utils/ordertableRows";
import TableOne from "../Table/TableOne";

const OrdersTable = ({ rows, sort }) => {
  return (
    <div className="ordersTableCont">
      <div className="TopSeach">
        <CiSearch className="icon" />
        <input placeholder="Find order ID, product name, customer name,..." />
      </div>
      <TableOne
        columns={columns}
        rows={rows ? rows : orderSampleData}
        sort={sort}
      />
    </div>
  );
};

export default OrdersTable;
