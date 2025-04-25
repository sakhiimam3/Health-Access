"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format, getYear, isValid, parse } from "date-fns";
import { FormField } from "@/components/ui/form";

// Generate arrays for days, months and years
const generateDaysArray = (month: number, year: number) => {
  if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
  
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" }
];

// Generate years from 100 years ago up to current year
const currentYear = getYear(new Date());
const YEARS = Array.from(
  { length: 100 },
  (_, i) => currentYear - i
).reverse();

interface DateOfBirthPickerProps {
  value: string;
  onChange: (dateString: string) => void; 
  name: string;
  label?: string;
  error?: string;
  className?: string;
  id?: string;
}

const DateOfBirthPicker = ({
  value,
  onChange,
  name,
  label = "Date of Birth",
  error,
  className,
  id,
  ...props
}: DateOfBirthPickerProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [days, setDays] = useState<number[]>([]);

  // Parse the incoming date string if provided
  useEffect(() => {
    if (value) {
      try {
        const date = parse(value, "yyyy-MM-dd", new Date());
        if (isValid(date)) {
          setSelectedYear(date.getFullYear().toString());
          setSelectedMonth((date.getMonth() + 1).toString());
          setSelectedDay(date.getDate().toString());
        }
      } catch (e) {
        console.error("Invalid date format:", value);
      }
    }
  }, [value]);

  // Update days when month or year changes
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      setDays(generateDaysArray(parseInt(selectedMonth), parseInt(selectedYear)));
    }
  }, [selectedMonth, selectedYear]);

  // Combine the values and call onChange
  const updateDate = (day: string, month: string, year: string) => {
    if (day && month && year) {
      // Format as YYYY-MM-DD
      const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      onChange(dateStr);
    }
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {label && (
        <div className="text-lg mb-2 textColor">{label}</div>
      )}
      
      <div className="flex space-x-2">
        {/* Year Select */}
        <div className="w-1/3">
          <Select
            value={selectedYear}
            onValueChange={(value) => {
              setSelectedYear(value);
              updateDate(selectedDay, selectedMonth, value);
            }}
          >
            <SelectTrigger className="rounded-full h-11 border-[#737373]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {YEARS.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Month Select */}
        <div className="w-1/3">
          <Select
            value={selectedMonth}
            onValueChange={(value) => {
              setSelectedMonth(value);
              updateDate(selectedDay, value, selectedYear);
            }}
          >
            <SelectTrigger className="rounded-full h-11 border-[#737373]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {MONTHS.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Day Select */}
        <div className="w-1/3">
          <Select
            value={selectedDay}
            onValueChange={(value) => {
              setSelectedDay(value);
              updateDate(value, selectedMonth, selectedYear);
            }}
          >
            <SelectTrigger className="rounded-full h-11 border-[#737373]">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {days.map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Calendar Icon */}
        <Button 
          type="button" 
          variant="outline" 
          className="px-3 h-11 rounded-full border-[#737373]"
          onClick={(e) => e.preventDefault()}
        >
          <CalendarIcon className="h-5 w-5 text-[#737373]" />
        </Button>
      </div>
      
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

// For use with react-hook-form
const FormDateOfBirthPicker = ({ 
  control, 
  name,
  label,
  className 
}: {
  control: any;
  name: string;
  label?: string;
  className?: string;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="block text-lg mb-2 textColor">{label}</FormLabel>}
          <FormControl>
            <DateOfBirthPicker 
              name={name}
              value={field.value} 
              onChange={field.onChange}
              label=""
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { DateOfBirthPicker, FormDateOfBirthPicker }; 