import { useState } from "react";

const emptyStudent = { name: "", room: "", contact: "", feeStatus: "Unpaid" };

const StudentTable = ({ students, setStudents })=>
 {
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyStudent);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyStudent);
    setShowModal(true);
  };

  const openEdit = (student) => {
    setEditTarget(student.id);
    setForm({ name: student.name, room: student.room, contact: student.contact, feeStatus: student.feeStatus });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editTarget !== null) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editTarget ? { ...s, ...form } : s))
      );
    } else {
      const newId = Date.now();
      setStudents((prev) => [...prev, { id: newId, ...form }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={openAdd}
          className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-5 py-2 rounded-xl transition"
        >
          + Add Student
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-slate-900/70 rounded-2xl">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Room</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center border-b border-slate-800">
                <td className="p-4">{student.id}</td>
                <td>{student.name}</td>
                <td>{student.room}</td>
                <td>{student.contact}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.feeStatus === "Paid" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {student.feeStatus}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-2">
                  <button
                    onClick={() => openEdit(student)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-white text-xl font-bold mb-5">
              {editTarget !== null ? "Edit Student" : "Add Student"}
            </h2>
            <div className="space-y-4">
              {[["Name", "name", "text"], ["Room", "room", "text"], ["Contact", "contact", "text"]].map(([label, key, type]) => (
                <div key={key}>
                  <label className="text-slate-400 text-sm block mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-slate-700 text-white rounded-xl px-4 py-2 border border-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-slate-400 text-sm block mb-1">Fee Status</label>
                <select
                  value={form.feeStatus}
                  onChange={(e) => setForm({ ...form, feeStatus: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-xl px-4 py-2 border border-slate-600 focus:outline-none focus:border-cyan-500"
                >
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white px-4 py-2 rounded-xl transition">Cancel</button>
              <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-5 py-2 rounded-xl transition">
                {editTarget !== null ? "Save Changes" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default StudentTable;