'use client';

import { useState } from 'react';

export default function HandleDeleteEmployee({ employee, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/employees/${employee.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete employee');
      }

      onConfirm(employee.id);
    } catch (error) {
      console.error('Error deleting employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Delete Employee</h2>
        <p className="text-gray-700">
          Are you sure you want to delete{' '}
          <span className="font-bold">{employee.firstName} {employee.lastName}</span>?
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:ring-2 focus:ring-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
