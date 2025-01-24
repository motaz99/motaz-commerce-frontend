import * as yup from "yup";

export const accountSchema = yup.object().shape({
  employeeId: yup.string().required("Employee ID is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});
