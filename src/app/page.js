'use client';
import React, { useState } from 'react';
import './orders.scss';

import OrderstableWrapper from '@/components/orders/OrderTableWrapper/OrdersTableWrapper';
import MainOrdersController from '@/components/orders/MainOrdersController/MainOrdersController';

const Orders = () => {
  const [isEmptyOrders, setIsEmptyOrders] = useState(false);
  return (
    <div className="orederMainPage">
      <MainOrdersController isEmptyOrders={isEmptyOrders} />
      <OrderstableWrapper
        isEmptyOrders={isEmptyOrders}
        setIsEmptyOrders={setIsEmptyOrders}
      />
    </div>
  );
};

export default Orders;
