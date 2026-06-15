const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-slate-400">{title}</h3>
          <h2 className="text-3xl font-bold text-white mt-2">{value}</h2>
        </div>
        <div className="text-4xl text-cyan-400">{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;