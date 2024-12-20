import * as yup from "yup";

export const employeeSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().nullable(),
  lastName: yup.string().required("Last name is required"),
  familyName: yup.string().nullable(),
  dateOfBirth: yup.date().required("Date of birth is required"),
  gender: yup.string().oneOf(["Male", "Female"], "Gender is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  role: yup.string().required("Role is required"),
  sindibadId: yup.string().required("Sindibad ID is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().nullable(),
  leaveBalance: yup
    .number()
    .typeError("Leave balance must be a number")
    .required("Leave balance is required"),
});
