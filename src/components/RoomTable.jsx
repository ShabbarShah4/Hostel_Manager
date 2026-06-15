import { useState } from "react";

const emptyRoom = { number: "", capacity: 4, status: "Vacant" };

const RoomTable = ({ rooms, setRooms }) =>
 {
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyRoom);

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyRoom);
    setShowModal(true);
  };

  const openEdit = (room) => {
    setEditTarget(room.id);
    setForm({ number: room.number, capacity: room.capacity, status: room.status });
    setShowModal(true);
  };

  const handleDelete = (id) => setRooms((prev) => prev.filter((r) => r.id !== id));

  const handleSubmit = () => {
    if (!form.number.trim()) return;
    if (editTarget !== null) {
      setRooms((prev) => prev.map((r) => (r.id === editTarget ? { ...r, ...form } : r)));
    } else {
      setRooms((prev) => [...prev, { id: Date.now(), ...form }]);
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
          + Add Room
        </button>
      </div>

      <div className="overflow-x-auto bg-slate-900/70 rounded-2xl">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-4">Room</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="text-center border-b border-slate-800">
                <td className="p-4">{room.number}</td>
                <td>{room.capacity}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${room.status === "Vacant" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {room.status}
                  </span>
                </td>
                <td className="p-4 flex justify-center gap-2">
                  <button onClick={() => openEdit(room)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded-lg transition">Edit</button>
                  <button onClick={() => handleDelete(room.id)} className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded-lg transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-white text-xl font-bold mb-5">{editTarget !== null ? "Edit Room" : "Add Room"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm block mb-1">Room Number</label>
                <input type="text" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-xl px-4 py-2 border border-slate-600 focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-1">Capacity</label>
                <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) })}
                  className="w-full bg-slate-700 text-white rounded-xl px-4 py-2 border border-slate-600 focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="text-slate-400 text-sm block mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-xl px-4 py-2 border border-slate-600 focus:outline-none focus:border-cyan-500">
                  <option>Vacant</option>
                  <option>Occupied</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white px-4 py-2 rounded-xl transition">Cancel</button>
              <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-5 py-2 rounded-xl transition">
                {editTarget !== null ? "Save Changes" : "Add Room"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default RoomTable