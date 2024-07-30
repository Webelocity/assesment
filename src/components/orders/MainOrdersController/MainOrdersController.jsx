'use client';

import React from 'react';
import './MainOrdersController.scss';
import { FiPlusCircle } from 'react-icons/fi';
import { FiUpload } from 'react-icons/fi';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const MainOrdersController = ({ isEmptyOrders }) => {
  const navigate = useRouter();

  return (
    <div className="topOrderPagepWrapper">
      <h1>Order Management</h1>
      <div className="bttns-Wrapper">
        {!isEmptyOrders && (
          <Button className="mainBttn light">
            <FiUpload />
            Export CSV
          </Button>
        )}
        <button
          className="mainBttn black"
          onClick={() => navigate.push('/orders/create')}
        >
          <FiPlusCircle />
          Create Order
        </button>
      </div>
    </div>
  );
};

export default MainOrdersController;
