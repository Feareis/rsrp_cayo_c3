import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate?: Date; // Optional target date
  days?: number; // Optional initial time values
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export default function CountdownTimer({ targetDate, days = 0, hours = 0, minutes = 0, seconds = 0 }: CountdownTimerProps) {
  // Function to calculate initial remaining time
  const getInitialTimeLeft = () => {
    if (targetDate) {
      const diff = targetDate.getTime() - new Date().getTime();
      return diff > 0
        ? {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          }
        : { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(({ days, hours, minutes, seconds }) => {
        if (seconds > 0) return { days, hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { days, hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { days, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0) return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        clearInterval(interval);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-row items-center gap-2 text-[#cfd8dc] text-xl font-bold">
      {[{ unit: "days", label: "Jours" }, { unit: "hours", label: "Heures" }, { unit: "minutes", label: "Minutes" }, { unit: "seconds", label: "Secondes" }].map(({ unit, label }, index, array) => (
        <div key={unit} className="flex flex-row items-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">{String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, "0")}</span>
            <p className="text-sm text-gray-400">{label}</p>
          </div>
          {index < array.length - 1 && <span className="text-xl font-semibold px-1">:</span>}
        </div>
      ))}
    </div>
  );
}
