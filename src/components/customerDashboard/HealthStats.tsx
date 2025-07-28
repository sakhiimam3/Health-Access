import React from 'react';

interface HealthStatsProps {
  height: number;
  weight: number;
  onEdit?: () => void;
}

export default function HealthStats({ height, weight, onEdit }: HealthStatsProps) {
  // Realistic human maximum values
  const MAX_HEIGHT = 250; // cm (accounting for tallest humans ~220-250cm)
  const MAX_WEIGHT = 300;  // kg (accounting for extreme medical cases)
  
  // Calculate progress percentages with overflow protection
  const heightProgress = Math.min((height / MAX_HEIGHT) * 100, 100);
  const weightProgress = Math.min((weight / MAX_WEIGHT) * 100, 100);

  return (
    <div className="bg-white rounded-xl p-6 mt-2 shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-700 font-semibold">Health Stats</div>
        <button 
          onClick={onEdit}
          className="text-[#06B6D4] text-sm font-medium hover:underline"
        >
          Edit
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Height Stat */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Height</span>
            <span className="text-rose-500 font-semibold">{height}cm</span>
          </div>
          <div className="relative h-3 w-full">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-rose-100 rounded-full" />
            {/* Progress bar with tick marks */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              {[...Array(11)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-[1px] h-2 bg-rose-200"
                />
              ))}
            </div>
            {/* Active progress with overflow protection */}
            <div 
              className="absolute left-0 top-0 h-full bg-rose-500 rounded-full opacity-20"
              style={{ width: `${heightProgress}%` }}
            />
          </div>
        </div>

        {/* Weight Stat */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Weight</span>
            <span className="text-emerald-500 font-semibold">{weight}kg</span>
          </div>
          <div className="relative h-3 w-full">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-full" />
            {/* Progress bar with tick marks */}
            <div className="absolute inset-0 flex items-center justify-between px-1">
              {[...Array(11)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-[1px] h-2 bg-emerald-200"
                />
              ))}
            </div>
            {/* Active progress with overflow protection */}
            <div 
              className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full opacity-20"
              style={{ width: `${weightProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 