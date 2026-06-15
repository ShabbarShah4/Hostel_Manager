import { useEffect, useState } from "react";
import axios from "axios";

import DashboardCard from "../components/DashboardCard";

import {
  FaUsers,
  FaBed,
  FaMoneyBill,
} from "react-icons/fa";

const Dashboard =() => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setCount(res.data.length);
      });
  }, []);

  return (
    <div>
      <h1 className="text-white text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <DashboardCard
          title="Students"
          value={count}
          icon={<FaUsers />}
        />

        <DashboardCard
          title="Rooms"
          value={count}
          icon={<FaBed />}
        />

        <DashboardCard
          title="Fees"
          value={`Rs. ${count * 15000}`}
          icon={<FaMoneyBill />}
        />
      </div>
    </div>
  );
}
export default Dashboard;