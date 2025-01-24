'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AccountAddModal from '../../models/AccountAddModal';
import AccountEditModal from '../../models/AccountEditModal';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch('/api/employees/accounts', { method: 'GET' });

        if (res.status === 401 || res.status === 403) {
          router.push('/login');
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch accounts');
        }

        const data = await res.json();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleAddAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
  };

  const handleEditAccount = (updatedAccount) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === updatedAccount.id ? updatedAccount : account
      )
    );
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleOpenEditModal = (account) => {
    setAccountToEdit(account);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setAccountToEdit(null);
    setShowEditModal(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 px-3 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700"
          >
            Add Account
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Employee</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={account.id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{account.email}</td>
                <td className="px-6 py-4">
                  {account.employee
                    ? `${account.employee.firstName} ${account.employee.lastName}`
                    : 'Unassigned'}
                </td>
                <td className="px-6 py-4">{new Date(account.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex space-x-4">
                  <button
                    onClick={() => handleOpenEditModal(account)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AccountAddModal
          onClose={handleCloseAddModal}
          onAdd={handleAddAccount}
        />
      )}

      {showEditModal && (
        <AccountEditModal
          account={accountToEdit}
          onClose={handleCloseEditModal}
          onEdit={handleEditAccount}
        />
      )}
    </div>
  );
}
