import { useState } from "react";

export default function EmployeeAddModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    familyName: "",
    startDate: "",
    endDate: "",
    gender: "",
    role: "",
    phoneNumber: "",
    dateOfBirth: "",
    sindibadId: "",
    leaveBalance: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        phoneNumber: parseInt(formData.phoneNumber, 10),
        leaveBalance: parseInt(formData.leaveBalance, 10),
        startDate: new Date(formData.startDate).toISOString(),
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      };

      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create employee");

      const newEmployee = await res.json();
      onAdd(newEmployee);
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[700px]">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Add New Employee
        </h2>
        <form className="grid grid-cols-2 gap-4">
          {/* First Column */}
          <div>
            <label className="block text-sm font-medium text-black">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Family Name</label>
            <input
              type="text"
              name="familyName"
              value={formData.familyName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Second Column */}
          <div>
            <label className="block text-sm font-medium text-black">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Sindibad ID</label>
            <input
              type="text"
              name="sindibadId"
              value={formData.sindibadId}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Leave Balance</label>
            <input
              type="number"
              name="leaveBalance"
              value={formData.leaveBalance}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>
        </form>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            disabled={loading}
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}
