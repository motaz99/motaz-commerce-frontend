import { useState } from "react";
import AsyncSelect from "react-select/async";

export default function AccountAddModal({ onClose, onAdd }) {
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadOptions = async (inputValue) => {
    if (!inputValue) return []; 
    try {
      const res = await fetch(`/api/employees?search=${inputValue}`);
      if (!res.ok) throw new Error("Failed to fetch employees");

      const data = await res.json();
      return data.map((employee) => ({
        value: employee.id,
        label: `${employee.firstName} ${employee.lastName}`,
      }));
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  };

  const handleEmployeeChange = (option) => {
    if (option) {
      setSelectedEmployee({ id: option.value, name: option.label });
    } else {
      setSelectedEmployee(null);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 


    if (!selectedEmployee) {
      setError("Please select an employee");
      return;
    }

    try {
      const body = {
        employeeId: selectedEmployee.id,
        email: e.target.email.value,
        password: e.target.password.value,
      };


      const res = await fetch("/api/employees/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create account");

      const newAccount = await res.json();
      onAdd(newAccount);
      onClose();
    } catch (error) {
      setError(error.message);
      console.error("Error adding account:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Add New Account
        </h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium text-black">Employee</label>
            <AsyncSelect
              loadOptions={loadOptions}
              onChange={handleEmployeeChange}
              placeholder="Search for employee..."
              isClearable
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Close
            </button>
            <button
              type="submit" // Ensure this is a submit button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
