import { useEffect, useState } from "react";
import axios from "axios";
import StudentTable from "../components/StudentTable";

const Students =() => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      const data = res.data.map((user) => ({
        id: user.id,
        name: user.name,
        room: `A${100 + user.id}`,
        contact: user.phone,
        feeStatus: user.id % 2 === 0 ? "Paid" : "Unpaid",
      }));
      setStudents(data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-white text-4xl font-bold mb-6">Students</h1>
      <StudentTable students={students} setStudents={setStudents} />
    </div>
  );
}
export default Students