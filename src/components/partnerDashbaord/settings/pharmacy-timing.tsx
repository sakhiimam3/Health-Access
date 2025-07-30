"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Check, X } from "lucide-react";
import {
  useGetPartnerProfile,
  useUpdatePartnerProfile,
  useUpdatePharmacyTiming,
} from "@/lib/hooks";
import { toast } from "react-toastify";

interface DayTiming {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const ALL_DAYS = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export function PharmacyTiming() {
  const { data: profile, isLoading } = useGetPartnerProfile();
  console.log(profile,"profile2211")

  const { mutate: updateTiming, isPending } = useUpdatePartnerProfile();
  const [timings, setTimings] = useState<DayTiming[]>([]);

  // Initialize all 7 days with existing timings enabled and others disabled
  useEffect(() => {
    const initialTimings: DayTiming[] = ALL_DAYS.map((day) => {
      // Check if this day exists in profile data
      const existingTiming = profile?.data?.timings?.find(
        (timing: any) => timing.dayOfWeek === day
      );

      if (existingTiming) {
        // Use existing timing with enabled state
        return {
          day,
          enabled: !existingTiming.isClosed,
          startTime: existingTiming.openTime,
          endTime: existingTiming.closeTime,
        };
      } else {
        // Default timing for days not in profile (disabled by default)
        return {
          day,
          enabled: false,
          startTime: "10:00",
          endTime: "18:00",
        };
      }
    });

    setTimings(initialTimings);
  }, [profile]);

  const updateTimingState = (
    index: number,
    field: keyof DayTiming,
    value: string | boolean
  ) => {
    const updatedTimings = [...timings];
    updatedTimings[index] = { ...updatedTimings[index], [field]: value };
    setTimings(updatedTimings);
  };

  const handleSave = () => {
    const formattedTimings = timings.map((timing) => ({
      dayOfWeek: timing.day,
      openTime: timing.startTime,
      closeTime: timing.endTime,
      isClosed: !timing.enabled,
    }));

    updateTiming(
      { timings: formattedTimings },
      {
        onSuccess: () => {
          toast.success("Pharmacy timings updated successfully");
        },
        onError: () => {
          toast.error("Failed to update pharmacy timings");
        },
      }
    );
  };

  const CustomToggle = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-green-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform flex items-center justify-center`}
      >
        {checked ? (
          <Check className="h-2.5 w-2.5 text-green-500" strokeWidth={3} />
        ) : (
          <X className="h-2.5 w-2.5 text-gray-400" strokeWidth={3} />
        )}
      </span>
    </button>
  );

  // Group days into pairs for 2-column layout
  const dayPairs = [];
  for (let i = 0; i < timings.length; i += 2) {
    if (i + 1 < timings.length) {
      dayPairs.push([timings[i], timings[i + 1]]);
    } else {
      dayPairs.push([timings[i]]);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-ubuntu font-bold text-gray-900">
          Pharmacy Timing
        </h2>
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-ubuntu font-bold text-gray-900">
        Pharmacy Timing
      </h2>

      <div className="space-y-8">
        {dayPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="grid grid-cols-2 gap-8">
            {pair.map((timing, dayIndex) => {
              const actualIndex = pairIndex * 2 + dayIndex;
              return (
                <div key={timing.day} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-roboto font-semibold text-gray-900">
                      {timing.day}
                    </h3>
                    <CustomToggle
                      checked={timing.enabled}
                      onChange={(checked) =>
                        updateTimingState(actualIndex, "enabled", checked)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 font-roboto mb-2">
                        Start Time
                      </p>
                      <div className="relative">
                        <input
                          type="time"
                          value={timing.startTime}
                          onChange={(e) => {
                            updateTimingState(
                              actualIndex,
                              "startTime",
                              e.target.value
                            );
                          }}
                          disabled={!timing.enabled}
                          className="w-full h-8 text-sm px-4 rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-roboto mb-2">
                        End Time
                      </p>
                      <div className="relative">
                        <input
                          type="time"
                          value={timing.endTime}
                          onChange={(e) => {
                            updateTimingState(
                              actualIndex,
                              "endTime",
                              e.target.value
                            );
                          }}
                          disabled={!timing.enabled}
                          className="w-full h-8 text-sm px-4 rounded-full border border-[#E7E7E7] shadow-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6 mt-8">
        <Button
          onClick={handleSave}
          disabled={isPending}
          className="bg-teal-500 text-white hover:bg-teal-600 font-roboto font-semibold px-8 py-2.5"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
