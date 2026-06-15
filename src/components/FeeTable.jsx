import { useState } from "react";

const emptyFee = { student: "", amount: 15000, status: "Unpaid" };

export default function FeeTable({ fees, setFees }) {
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyFee);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyFee);
    setShowModal(true);
  };

  const openEdit = (fee) => {
    setEditTarget(fee.id);
    setForm({ student: fee.student, amount: fee.amount, status: fee.status });
    setShowModal(true);
  };

  const handleDelete = (id) => setFees((prev) => prev.filter((f) => f.id !== id));

  const handleSubmit = () => {
    if (!form.student.trim()) return;
    if (editTarget !== null) {
      setFees((prev) => prev.map((f) => (f.id === editTarget ? { ...f, ...form } : f)));
    } else {
      setFees((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={openAdd}
          className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-5 py-2 rounded-xl transition"
        >
          + Add Fee Record
        </button>
      </div>

      <div className="overflow-x-auto bg-slate-900/70 rounded-2xl">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-4">Student</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee.id} className="text-center border-b border-slate-800">
                <td className="p-4">{fee.student}</td>
                <td>Rs. {fee.amount}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${fee.status === "Paid" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {fee.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => openEdit(fee)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded-lg transition">Edit</button>
                  <button onClick={() => handleDelete(fee.id)} className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-lg transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-white text-xl font-bold mb-5">{editTarget !== null ? "Edit Fee Record" : "Add Fee Record"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm block mb-1">Student Name</label>
                <input type="text" value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-xl px-4 py-2 border border-slate-600 focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-1">Amount (Rs.)</label>
                <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: parseInt(e.target.value) })}
                  className="w-full bg-slate-700 text-white rounded-xl px-4 py-2 border border-slate-600 focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-xl px-4 py-2 border border-slate-600 focus:outline-none focus:border-cyan-500">
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white px-4 py-2 rounded-xl transition">Cancel</button>
              <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-5 py-2 rounded-xl transition">
                {editTarget !== null ? "Save Changes" : "Add Record"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}