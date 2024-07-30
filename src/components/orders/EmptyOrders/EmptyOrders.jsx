import React from 'react';
import './EmptyOrders.scss';
import { Avatar, Button } from '@mui/material';
import { GoDotFill } from 'react-icons/go';
import { AiOutlineGlobal } from 'react-icons/ai';
import { ReactSVG } from 'react-svg';
import { RxPlusCircled } from 'react-icons/rx';
import { useRouter } from 'next/navigation';

const EmptyOrders = () => {
  const navigate = useRouter();
  return (
    <div className="emptyOrders">
      <div className="wrapper">
        <div className="top">
          <Avatar src="./assets/logo.webp" className="mainAvatarEmpty" />
          <h1>Let&apos;s Get You Started with Orders!</h1>
          <p className="desc">
            Your ToolSwift order dashboard is currently empty. <br />
            But fear not! Here&apos;s how to fill it up:
          </p>
        </div>
        <div className="bottom">
          <div className="box">
            <div className="boxTop">
              <p className="title"> Website Orders</p>
              <span className={`boxBadge connected`}>
                <GoDotFill />
                Connected
              </span>
            </div>
            <p className="middleP">
              Connect your in-store system for seamless order flow which will
              automatically appear here.
            </p>
            <Button className="boxBttn light">
              <AiOutlineGlobal />
              Online Website
            </Button>
          </div>
          <div className="box">
            <div className="boxTop">
              <p className="title"> Receive Orders from POS</p>
              <span className={`boxBadge`}>
                <GoDotFill />
                Not Connected
              </span>
            </div>
            <p className="middleP">
              Connect your in-store system for seamless order flow which will
              automatically appear here.
            </p>
            <Button className="boxBttn lightdark">
              <ReactSVG src="./assets/boxIcon.svg" />
              POS Integration
            </Button>
          </div>
          <div className="box">
            <div className="boxTop">
              <p className="title">Create Manual Orders</p>
            </div>
            <p className="middleP">
              Navigate to a page where you can create a new order by adding
              products and customer information.
            </p>
            <Button
              className="boxBttn dark"
              onClick={() => navigate.push('/orders/create')}
            >
              <RxPlusCircled />
              Create Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyOrders;
