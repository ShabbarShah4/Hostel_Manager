import { useEffect, useState } from "react";
import axios from "axios";
import FeeTable from "../components/FeeTable";

const Fees =() => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      const data = res.data.slice(0, 15).map((post) => ({
        id: post.id,
        student: `Student ${post.userId}`,
        amount: 15000,
        status: post.id % 2 === 0 ? "Paid" : "Unpaid",
      }));
      setFees(data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-white text-4xl font-bold mb-6">Fees</h1>
      <FeeTable fees={fees} setFees={setFees} />
    </div>
  );
}
export default Fees;