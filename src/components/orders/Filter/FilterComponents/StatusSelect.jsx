import React, { useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Box,
  Menu,
} from '@mui/material';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { PiPackage } from 'react-icons/pi';
import { IoIosArrowDown } from 'react-icons/io';

const CustomMenu = styled((props) => <Menu elevation={3} {...props} />)(
  ({ theme }) => ({
    '& .MuiPaper-root': {
      display: 'flex',
      maxHeight: '222px',
      padding: '8px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',
      borderRadius: '16px',
      border: '1px solid var(--Colors-Generic-Black)',
      background: 'var(--Colors-Generic-White)',
      boxShadow: '0px 6px 15px -2px rgba(0, 0, 0, 0.1)',
    },
    '& .MuiList-root': {
      padding: 0,
    },
    '& .MuiMenuItem-root': {
      padding: '10px 14px',
      fontSize: '14px',
      color: '#433F3C',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

function StatusSelect({ onChange, reset }) {
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
    onChange(event.target?.value);
  };

  const menuProps = {
    MenuComponent: CustomMenu,
    PaperProps: {
      sx: {
        borderRadius: 4,
        maxHeight: '222px',
        border: '1px solid var(--Colors-Generic-Black)',
        boxShadow: '0px 6px 15px -2px rgba(0, 0, 0, 0.1)',
      },
    },
  };

  const handleReset = () => {
    setStatus('');
  };

  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset]);

  return (
    <div className="filter_field">
      <div className="field_head">
        <div className="field_name">
          {' '}
          <PiPackage />
          Status
        </div>
        <Button className="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="field_control">
        <FormControl fullWidth variant="outlined">
          <InputLabel>
            <Box
              component="span"
              sx={{ fontSize: '1.5rem', color: '#A7A19D', mr: 1 }}
            >
              &#8226;
            </Box>
            Choose Status
          </InputLabel>{' '}
          <Select
            value={status}
            onChange={handleChange}
            label="Choose Status"
            MenuProps={menuProps}
            IconComponent={IoIosArrowDown}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="awaitingPayment">Awaiting Payment</MenuItem>
            <MenuItem value="overdue">Overdue</MenuItem>
            <MenuItem value="pickingPacking">Picking & Packing</MenuItem>
            <MenuItem value="outForDelivery">Out for Delivery</MenuItem>
            <MenuItem value="readyForPickup">Ready for Pickup</MenuItem>
            <MenuItem value="pickedUp">Picked Up</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="refunded">Refunded</MenuItem>
            <MenuItem value="onHold">On Hold</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default StatusSelect;
