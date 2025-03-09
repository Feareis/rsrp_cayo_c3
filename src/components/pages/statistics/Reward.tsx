import { Trophy } from "lucide-react";

/**
 * Props type for Reward component.
 */
interface RewardProps {
  amounts: { [key: number]: string }; // Mapping of rank to reward amount
}

/**
 * Reward component displays the top 3 rankings with their respective rewards.
 */
const Reward: React.FC<RewardProps> = ({ amounts }) => {
  /**
   * Predefined ranks with corresponding labels and amounts.
   */
  const rewards = [
    { rank: "1er", amount: amounts[1] ?? ".." },
    { rank: "2ème", amount: amounts[2] ?? ".." },
    { rank: "3ème", amount: amounts[3] ?? ".." },
  ];

  return (
    <div
      className="relative flex flex-row justify-around w-full bg-[#37474f]
      border border-gray-500/60 py-6 rounded-lg"
    >
      {/* Trophy Icon on top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-[#263238] border border-gray-500 rounded-xl shadow-xl px-3 py-1
        flex items-center gap-2"
        aria-label="Top rewards"
      >
        <Trophy className="text-yellow-400" size={20} />
      </div>

      {/* Reward cards */}
      {rewards.map((reward) => (
        <div
          key={reward.rank} // Using rank as key for better stability
          className="flex flex-col items-center bg-blue-800/50 border border-gray-500/60
          rounded-xl shadow-xl w-full mx-2 p-2"
        >
          <p className="text-blue-400 text-xl font-bold">{reward.rank}</p>
          <p className="text-green-600 text-xl font-bold mt-2">{reward.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default Reward;
