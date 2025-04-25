import React, { forwardRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";
import "./datepicker-custom.css";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  showYearDropdown?: boolean;
  yearDropdownItemNumber?: number;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Select date",
      className = "",
      disabled = false,
      error = false,
      showYearDropdown = true,
      yearDropdownItemNumber = 100,
      minDate,
      maxDate,
    },
    ref
  ) => {
    // Calculate a reasonable maxDate (today) and minDate (100 years ago) for DOB
    const today = new Date();
    const defaultMaxDate = today;
    const defaultMinDate = new Date(
      today.getFullYear() - 100,
      today.getMonth(),
      today.getDate()
    );

    return (
      <div ref={ref} className="relative w-full custom-datepicker-container">
        <ReactDatePicker
          selected={value}
          onChange={onChange}
          placeholderText={placeholder}
          className={cn(
            "w-full px-3 py-2 rounded-full h-11 border border-[#737373] placeholder:text-[#B8B8B8] focus:outline-none focus:ring-2 focus:ring-[#00A0AA] focus:border-transparent",
            error ? "border-red-500" : "border-[#737373]",
            className
          )}
          disabled={disabled}
          dateFormat="dd/MM/yyyy"
          showYearDropdown={showYearDropdown}
          scrollableYearDropdown
          yearDropdownItemNumber={15}
          minDate={minDate || defaultMinDate}
          maxDate={maxDate || defaultMaxDate}
          showMonthDropdown
          dropdownMode="select"
          popperClassName="custom-datepicker-popper"
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="custom-datepicker-header">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className="prev-month-btn"
              >
                {"<"}
              </button>
              
              <div className="dropdown-selects">
                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) => changeYear(parseInt(value))}
                  className="year-dropdown"
                >
                  {Array.from(
                    { length: yearDropdownItemNumber || 15 },
                    (_, i) => today.getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  value={date.getMonth()}
                  onChange={({ target: { value } }) => changeMonth(parseInt(value))}
                  className="month-dropdown"
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, i) => (
                    <option key={month} value={i}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className="next-month-btn"
              >
                {">"}
              </button>
            </div>
          )}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1V3M14 1V3M1 7H19M3 3H17C18.1046 3 19 3.89543 19 5V17C19 18.1046 18.1046 19 17 19H3C1.89543 19 1 18.1046 1 17V5C1 3.89543 1.89543 3 3 3Z"
              stroke="#737373"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker }; 