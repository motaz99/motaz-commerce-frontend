import { useState } from "react";

export default function EmployeeDetailsModal({ employee, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...employee });
  const [loading, setLoading] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
        const { id, leaveBalance, startDate, dateOfBirth, ...dataToUpdate } = formData;
        const payload = {
          ...dataToUpdate,
          leaveBalance: parseInt(leaveBalance, 10),
          startDate: new Date(startDate).toISOString(),
          dateOfBirth: new Date(dateOfBirth).toISOString()
        };
    
      const res = await fetch(`/api/employees/${employee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update employee");
      }

      const updatedEmployee = await res.json();
      onUpdate(updatedEmployee);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-black">
          {formData.firstName} {formData.lastName}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">
              Sindibad ID
            </label>
            <input
              type="text"
              name="sindibadId"
              value={formData.sindibadId || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth.split("T")[0] || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate.split("T")[0] || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">
              Leave Balance
            </label>
            <input
              type="number"
              name="leaveBalance"
              value={formData.leaveBalance || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`mt-1 block w-full ${
                isEditing ? "border-gray-300" : "bg-gray-100"
              } rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black`}
            />
          </div>
        </form>   
        <div className="mt-6 flex justify-between items-center space-x-2">
        <button
            onClick={onClose}
            className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            disabled={loading} 
        >
            Close
        </button>
        {isEditing ? (
            <>
             <button
                onClick={handleToggleEdit}
                className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} 
            >
                Cancel Edit
            </button>
            <button
                onClick={handleSaveChanges}
                className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
            >
                {loading ? "Saving..." : "Save"}
            </button>
            </>
        ) : (
            <button
            onClick={handleToggleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
            Edit
            </button>
        )}
        </div>


      </div>
    </div>
  );
}
