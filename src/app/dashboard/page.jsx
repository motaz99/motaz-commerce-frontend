'use client';

import { useState, useEffect } from 'react';
import Logout from '../components/Logout';
import HandleDeleteEmployee from '../models/handleDeleteEmployee';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch('/api/employees', { method: 'GET' });

        if (!res.ok) {
          throw new Error('Failed to fetch employees');
        }

        const data = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleOpenDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (employeeId) => {
    setEmployees(employees.filter((emp) => emp.id !== employeeId));
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setEmployeeToDelete(null);
    setShowDeleteModal(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee List</h1>
        <input
          type="text"
          placeholder="Search..."
          className="w-64 px-3 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Sindibad ID
              </th>
              <th scope="col" className="px-6 py-3">
                Join Date
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className="bg-white border-b hover:bg-gray-100"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </div>
                  <span className="ml-3">
                    {`${employee.firstName} ${employee.lastName}`}
                    <br />
                    <span className="text-xs text-gray-400">
                      {employee.idCardNumber || 'N/A'}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4">{employee.sindibadId || 'N/A'}</td>
                <td className="px-6 py-4">
                  {new Date(employee.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{employee.role}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <button className="text-blue-500 hover:underline">View</button>
                  <button className="text-green-500 hover:underline">Edit</button>
                  <button
                    onClick={() => handleOpenDeleteModal(employee)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteModal && (
        <HandleDeleteEmployee
          employee={employeeToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <Logout />
    </div>
  );
}
