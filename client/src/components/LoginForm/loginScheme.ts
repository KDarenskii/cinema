import * as Yup from "yup";

export const loginScheme = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(4, "Min length: 4").max(35, "Max length: 35"),
});
