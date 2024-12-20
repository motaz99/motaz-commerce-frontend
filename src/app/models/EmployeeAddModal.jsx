import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeSchema } from "../../schemas/employeeSchema";


export default function EmployeeAddModal({ onClose, onAdd }) {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
        leaveBalance: parseInt(data.leaveBalance, 10),
      };

      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create employee");
      }

      const newEmployee = await res.json();
      onAdd(newEmployee);
      reset();
    } catch (error) {
        setError(error.message)
        console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[700px]">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Add New Employee
        </h2>
         {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p> 
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black">First Name</label>
            <input
              {...register("firstName")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Middle Name</label>
            <input
              {...register("middleName")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Last Name</label>
            <input
              {...register("lastName")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Family Name</label>
            <input
              {...register("familyName")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.dateOfBirth?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Gender</label>
            <select
              {...register("gender")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <p className="text-red-500 text-sm">{errors.gender?.message}</p>
          </div>

          {/* Second Column */}
          <div>
                <label className="block text-sm font-medium text-black">Phone Number</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-gray-300 bg-gray-100 text-gray-800">
                    +964
                    </span>
                    <input
                    {...register("phoneNumber")}
                    maxLength="10"
                    placeholder="7710134234"
                    className="mt-1 block w-full border-gray-300 rounded-r-md shadow-sm focus:ring focus:ring-blue-300 text-black"
                    />
                </div>
                <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>
            </div>

          <div>
            <label className="block text-sm font-medium text-black">Role</label>
            <input
              {...register("role")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.role?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Sindibad ID</label>
            <input
              {...register("sindibadId")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.sindibadId?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Start Date</label>
            <input
              type="date"
              {...register("startDate")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">End Date</label>
            <input
              type="date"
              {...register("endDate", { required: false, shouldUnregister: true })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Leave Balance</label>
            <input
              type="number"
              {...register("leaveBalance")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
            />
            <p className="text-red-500 text-sm">{errors.leaveBalance?.message}</p>
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
            {isSubmitting ? "Saving..." : "Add Employee"}
          </button>
        </div>
      </div>
    </div>
  );
}
