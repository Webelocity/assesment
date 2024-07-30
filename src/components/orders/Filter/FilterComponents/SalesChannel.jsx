import React, { useEffect } from "react";
import { MenuItem, FormControl, Select, InputLabel, Menu } from "@mui/material";
import { styled } from "@mui/system";
import { BiBuildings } from "react-icons/bi";
import Button from "@mui/material/Button";
import { IoIosArrowDown } from "react-icons/io";

const CustomMenu = styled((props) => <Menu elevation={3} {...props} />)(
  ({ theme }) => ({
    "& .MuiPaper-root": {
      display: "flex",
      maxHeight: "222px",
      padding: "8px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "8px",
      borderRadius: "16px",
      border: "1px solid var(--Colors-Generic-Black)",
      background: "var(--Colors-Generic-White)",
      boxShadow: "0px 6px 15px -2px rgba(0, 0, 0, 0.1)",
    },
    "& .MuiList-root": {
      padding: 0,
    },
    "& .MuiMenuItem-root": {
      padding: "10px 14px",
      fontSize: "14px",
      color: "#433F3C",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

function SalesChannel({ onChange, reset }) {
  const [channel, setChannel] = React.useState("");
  const [POS, setPOS] = React.useState("");

  const handleChangeChannel = (event) => {
    setChannel(event.target.value);
    if (event.target.value !== "POS") {
      setPOS("");
    }
    onChange(event.target.value);
  };

  const handleChangePOS = (event) => {
    setPOS(event.target.value);
    onChange(event.target.value);
  };

  const handleReset = () => {
    setChannel("");
    setPOS("");
  };

  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset]);

  const menuProps = {
    MenuComponent: CustomMenu,
    PaperProps: {
      sx: {
        borderRadius: 4,
        maxHeight: "222px",
        border: "1px solid var(--Colors-Generic-Black)",
        boxShadow: "0px 6px 15px -2px rgba(0, 0, 0, 0.1)",
      },
    },
  };

  return (
    <div className="filter_field">
      <div className="field_head">
        <div className="field_name">
          {" "}
          <BiBuildings />
          Sales Channel
        </div>
        <Button className="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="field_control">
        <FormControl fullWidth variant="outlined">
          <InputLabel>Choose Sales Channel</InputLabel>
          <Select
            value={channel}
            onChange={handleChangeChannel}
            label="Choose Sales Channel"
            MenuProps={menuProps}
            IconComponent={IoIosArrowDown}>
            <MenuItem value="POS">POS</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
          </Select>

          {channel === "POS" && (
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>POS</InputLabel>
              <Select
                value={POS}
                onChange={handleChangePOS}
                label="POS"
                MenuProps={menuProps}>
                <MenuItem value="Canada Store">Canada Store</MenuItem>
                <MenuItem value="USA Store">USA Store</MenuItem>
                <MenuItem value="UK Store">UK Store</MenuItem>
              </Select>
            </FormControl>
          )}
        </FormControl>
      </div>
    </div>
  );
}

export default SalesChannel;
