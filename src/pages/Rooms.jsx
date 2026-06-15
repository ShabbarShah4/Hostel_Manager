import { useEffect, useState } from "react";
import axios from "axios";
import RoomTable from "../components/RoomTable";

const Rooms =() => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const data = res.data.map((user) => ({
        id: user.id,
        number: `A${100 + user.id}`,
        capacity: 4,
        status: user.id % 2 === 0 ? "Occupied" : "Vacant",
      }));
      setRooms(data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-white text-4xl font-bold mb-6">Rooms</h1>
      <RoomTable rooms={rooms} setRooms={setRooms} />
    </div>
  );
}
export default Rooms
