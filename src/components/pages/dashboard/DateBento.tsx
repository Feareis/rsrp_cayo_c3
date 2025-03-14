import CountdownTimer from "../../../components/core/CountdownTimer";

/**
 * DateBento component displays the current week's range, today's date,
 * and a countdown timer for the next Sunday at 19:00.
 */
const DateBento: React.FC = () => {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  /**
   * Formats a date into "DD/MM/YY" (French format).
   */
  const formatDate = (date: Date) =>
    date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" });

  /**
   * Gets the current week's date range (Monday - Sunday).
   */
  const getCurrentWeekRange = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7)); // Adjust to Monday

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6); // Set to Sunday

    return `${formatDate(monday)} - ${formatDate(sunday)}`;
  };

  /**
   * Gets the last or next Sunday at 19:00.
   */
  const getLastOrNextSunday19h = () => {
    const now = new Date();
    const sunday = new Date(now);

    if (now.getDay() === 0 && now.getHours() < 19) {
      // If it's Sunday before 19h, take the current Sunday
      sunday.setHours(19, 0, 0, 0);
    } else {
      // Otherwise, take the next Sunday
      sunday.setDate(now.getDate() - now.getDay() + 7);
      sunday.setHours(19, 0, 0, 0);
    }

    return sunday;
  };

  return (
    <div
      className="flex flex-row flex-1 p-4 bg-[#263238] justify-around
      items-center border border-gray-500 rounded-xl shadow-2xl gap-16"
    >
      {/* Current week range */}
      <div className="flex flex-col text-xl font-bold text-center gap-2">
        <p className="text-xl font-bold">Semaine en cours :</p>
        <span className="p-1 px-2 bg-[#37474f] border border-gray-600 rounded-md">
          {getCurrentWeekRange()}
        </span>
      </div>

      {/* Current date */}
      <div className="flex flex-col text-xl font-bold text-center gap-2">
        <p className="text-xl font-bold">Date du jour :</p>
        <span className="p-1 bg-[#37474f] border border-gray-600 rounded-md">
          {currentDate}
        </span>
      </div>

      {/* Countdown Timer */}
      <div className="relative border border-gray-600 rounded-lg p-4 text-center text-md text-gray-400">
        <div
          className="absolute border-t border-x border-gray-600 rounded-xl
          shadow-xl -top-3 left-1/2 transform -translate-x-1/2 bg-[#263238]
          text-white text-sm font-bold px-3 py-1"
        >
          Reboot Compta
        </div>
        <CountdownTimer targetDate={getLastOrNextSunday19h()} />
      </div>
    </div>
  );
};

export default DateBento;
