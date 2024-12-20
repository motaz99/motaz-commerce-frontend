'use client';

import { useState } from 'react';

export default function HandleArchiveEmployee({ employee, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false);

  const handleArchive = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/employees/archive/toggle/${employee.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !employee.isActive }),
      });

      if (!res.ok) {
        throw new Error('Failed to archive/unarchive employee');
      }

      onConfirm(employee.id);
    } catch (error) {
      console.error('Error archiving/unarchiving employee:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-black">
          {employee.isActive ? 'Archive Employee' : 'Unarchive Employee'}
        </h2>
        <p className="text-gray-700">
          Are you sure you want to {employee.isActive ? 'archive' : 'unarchive'}{' '}
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
            onClick={handleArchive}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (employee.isActive ? 'Archiving...' : 'Unarchiving...') : employee.isActive ? 'Archive' : 'Unarchive'}
          </button>
        </div>
      </div>
    </div>
  );
}
