import * as yup from "yup";

export const accountEditSchema = yup.object().shape({
  accountId: yup.string().required("Account ID is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().optional(),
});
