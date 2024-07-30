import React, { useEffect } from 'react';
import { MenuItem, FormControl, Select, InputLabel, Menu } from '@mui/material';
import { styled } from '@mui/system';
import { FaRegUser } from 'react-icons/fa';
import Button from '@mui/material/Button';
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

function CustomerType({ onChange, reset }) {
  const [customer, setCustomer] = React.useState('');

  const handleChange = (event) => {
    setCustomer(event.target.value);
    onChange(event.target.value);
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
    setCustomer('');
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
          <FaRegUser />
          Customer Type
        </div>
        <Button className="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="field_control">
        <FormControl fullWidth variant="outlined">
          <InputLabel>Choose Customer Type</InputLabel>
          <Select
            value={customer}
            onChange={handleChange}
            label="Choose Customer Type"
            MenuProps={menuProps}
            IconComponent={IoIosArrowDown}
          >
            <MenuItem value="B2BCustomer">B2B Customer</MenuItem>
            <MenuItem value="PersonalCustomer">Personal Customer</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default CustomerType;
