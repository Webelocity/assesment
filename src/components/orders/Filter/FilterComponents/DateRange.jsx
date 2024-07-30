import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { CiCalendar } from "react-icons/ci";
import { IoCalendarClearOutline } from "react-icons/io5";
import Button from "@mui/material/Button";

function DateRange({ onChange, reset, Datesort }) {
  const [dateRange, setDateRange] = useState("");

  const shortcutRanges = [
    {
      label: "Today",
      getValue: () => {
        const today = dayjs();
        return [today, today];
      },
    },
    {
      label: "Yesterday",
      getValue: () => {
        const yesterday = dayjs().subtract(1, "day");
        return [yesterday, yesterday];
      },
    },
    {
      label: "Last 2 Days",
      getValue: () => {
        const today = dayjs();
        return [today.subtract(2, "day"), today];
      },
    },
    {
      label: "Last 3 Days",
      getValue: () => {
        const today = dayjs();
        return [today.subtract(3, "day"), today];
      },
    },
    {
      label: "Last 4 Days",
      getValue: () => {
        const today = dayjs();
        return [today.subtract(4, "day"), today];
      },
    },
    {
      label: "Last 5 Days",
      getValue: () => {
        const today = dayjs();
        return [today.subtract(5, "day"), today];
      },
    },
    {
      label: "Last 6 Days",
      getValue: () => {
        const today = dayjs();
        return [today.subtract(6, "day"), today];
      },
    },
    {
      label: "Last Week",
      getValue: () => {
        const today = dayjs();
        const prevWeek = today.subtract(7, "day");
        return [prevWeek.startOf("week"), prevWeek.endOf("week")];
      },
    },
    {
      label: "Current Month",
      getValue: () => {
        const today = dayjs();
        return [today.startOf("month"), today.endOf("month")];
      },
    },
    {
      label: "Last Month",
      getValue: () => {
        const startOfLastMonth = dayjs().subtract(1, "month").startOf("month");
        const endOfLastMonth = dayjs().subtract(1, "month").endOf("month");
        return [startOfLastMonth, endOfLastMonth];
      },
    },
    { label: "Reset", getValue: () => [null, null] },
  ];

  const handleReset = () => {
    setDateRange("");
  };

  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset]);

  const handleChange = (newValue) => {
    setDateRange(newValue);
    onChange({ start: newValue[0], end: newValue[1] });
  };

  return (
    <div className="filter_field">
      <div className="field_head">
        <div className="field_name">
          {Datesort ? (
            "Filter Date Range"
          ) : (
            <>
              <IoCalendarClearOutline />
              Date Placed Range
            </>
          )}
        </div>
        <Button className="reset" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <div className="field_control">
        <div className="date_labels">
          <p className="date_label">From</p>
          <p className="date_label">To</p>
          <CiCalendar className="calender_icon first_field" />
          <CiCalendar className="calender_icon second_field" />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            value={dateRange}
            onChange={(newValue) => handleChange(newValue)}
            slotProps={{
              shortcuts: {
                items: shortcutRanges,
              },
              actionBar: { actions: [] },
              field: { dateSeparator: "" },
            }}
            calendars={1}
            localeText={{ start: "MM/DD/YY", end: "MM/DD/YY" }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}

export default DateRange;
