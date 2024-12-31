'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from 'react-icons/ai';

export default function Logout() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <>
      <div className="relative group">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-900 focus:outline-none"
          aria-label="Logout"
        >
          <AiOutlineLogout className="w-6 h-6" />
        </button>

        <span className="absolute bottom-14 transform  px-3 py-3 text-xs text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Logout
        </span>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="mt-2 text-sm text-gray-600">Are you sure you want to log out?</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 mr-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
