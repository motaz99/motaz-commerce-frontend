'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountEditSchema } from '../../schemas/accountEditSchema';

export default function AccountEditModal({ account, onClose, onEdit }) {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(accountEditSchema),
    defaultValues: {
      accountId: account.id,
      email: account.email,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/employees/accounts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update account');
      }

      const updatedAccount = await res.json();
      onEdit(updatedAccount);
      onClose()
    } catch (error) {
      setError(error.message);
      console.error('Error editing account:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Edit Account
        </h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
          <input type="hidden" {...register('accountId')} />
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
              placeholder="Enter a new password (leave blank to keep current)"
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
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
