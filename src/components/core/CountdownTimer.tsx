import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate?: Date; // Date cible (ex : Dimanche 19h de la semaine passée)
  days?: number; // Temps de départ optionnel
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export default function CountdownTimer({ targetDate, days = 0, hours = 0, minutes = 0, seconds = 0 }: CountdownTimerProps) {
  const getInitialTimeLeft = () => {
    if (targetDate) {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
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
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else if (days > 0) {
            days--;
            hours = 23;
            minutes = 59;
            seconds = 59;
          } else {
            clearInterval(interval);
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-row items-center gap-2 text-[#cfd8dc] text-xl font-bold">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-semibold">{String(timeLeft.days).padStart(2, "0")}</span>
        <p className="text-xs text-gray-400">Jours</p>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-semibold">{String(timeLeft.hours).padStart(2, "0")}</span>
        <p className="text-xs text-gray-400">Heures</p>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-semibold">{String(timeLeft.minutes).padStart(2, "0")}</span>
        <p className="text-xs text-gray-400">Minutes</p>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-semibold">{String(timeLeft.seconds).padStart(2, "0")}</span>
        <p className="text-xs text-gray-400">Secondes</p>
      </div>
    </div>
  );
}
