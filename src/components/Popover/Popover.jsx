'use client';

import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import './Popover.scss';
import Image from 'next/image';
import { FaAngleDown } from 'react-icons/fa6';
import { Avatar } from '@mui/material';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/navigation';

const userOptions = [
  {
    name: 'Edit Profile',
    icon: '/assets/editIcon.svg',
    ref: '/settings/profile',
  },
  {
    name: 'Settings',
    icon: '/assets/icon16.svg',
    ref: '/settings',
  },
  {
    name: 'Logout',
    icon: '/assets/icon17.svg',
    ref: null,
  },
];

export default function ClickablePopover({
  options,
  props,
  dataKey,
  isAvatar,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStore, setSelectedStore] = useState(
    isAvatar ? null : options[0]
  );
  const router = useRouter();

  const optionsArry = isAvatar ? userOptions : options;

  //* MUI Popover functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //*

  const handleInnerClick = (option) => {
    isAvatar && option.ref ? router.push(option.ref) : setSelectedStore(option);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'clickable-popver' : undefined;

  const getIconByStoreType = (type) => {
    switch (type) {
      case 'online':
        return '/assets/webIcon.svg';
      case 'physical':
        return '/assets/icon15.svg';
      default:
        'online';
    }
  };

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        id="mainPopover"
      >
        {isAvatar ? (
          <Avatar alt="userName" src="/assets/userImg.webp" />
        ) : (
          <Image
            src={'/assets/logo.webp'}
            width={24}
            height={24}
            layout="object-fit"
            alt="store-logo"
            className="logoImg"
          />
        )}
        {isAvatar ? (
          <div className="userInfo">
            <p className="userName">Myke Lumber</p>
            <span className="userRole">Admin</span>
          </div>
        ) : (
          <span className="bttnTxt">{selectedStore[dataKey]}</span>
        )}
        <span className={`iconCircle ${anchorEl ? 'active' : ''}`}>
          <FaAngleDown />
        </span>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        style={{
          ...props,
        }}
      >
        {optionsArry?.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleInnerClick(option)}
            className={`optionsBttns ${
              selectedStore && selectedStore[dataKey] === option[dataKey]
                ? 'active'
                : ''
            }`}
            style={{
              width: props?.width || 'auto',
            }}
          >
            <ReactSVG
              src={option?.icon || getIconByStoreType(option?.type)}
              className="linkIcon"
            />

            {option[dataKey]}
          </Button>
        ))}
        {!isAvatar && (
          <Button
            className="optionsBttns"
            style={{
              width: props?.width || 'auto',
            }}
          >
            <ReactSVG src={'/assets/addIcon.svg'} className="linkIcon" />
            Add New Store
          </Button>
        )}
      </Popover>
    </div>
  );
}
