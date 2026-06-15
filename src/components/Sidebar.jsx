import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaBed, FaMoneyBill } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-10">
        TIME 2 MOVE
      </h2>

      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaHome />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/students"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaUsers />
            Students
          </Link>
        </li>

        <li>
          <Link
            to="/rooms"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaBed />
            Rooms
          </Link>
        </li>

        <li>
          <Link
            to="/fees"
            className="flex items-center gap-3 hover:text-cyan-400"
          >
            <FaMoneyBill />
            Fees
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar