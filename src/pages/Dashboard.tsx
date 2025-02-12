export default function Dashboard() {
  return (
    <div className="flex gap-4 px-4">
      <button className="flex-1 bg-[#263238] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">1</button>
      <button className="flex-1 bg-[#263238] text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">2</button>
      <button className="flex-1 bg-[#263238] text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">3</button>
      <button className="flex-1 bg-[#263238] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">4</button>
    </div>
  );
}
