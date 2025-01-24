'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountSchema } from '../../schemas/accountSchema';

export default function AccountAddModal({ onClose, onAdd }) {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(accountSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/employees/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create account');
      }

      const newAccount = await res.json();
      onAdd(newAccount);
      reset();
    } catch (error) {
      setError(error.message);
      console.error('Error adding account:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Add New Account
        </h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">Employee ID</label>
            <input
              {...register('employeeId')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.employeeId?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
        </form>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            disabled={isSubmitting}
          >
            Close
          </button>
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Add Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
