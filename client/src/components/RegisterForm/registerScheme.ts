import * as Yup from "yup";

export const registerScheme = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(4, "Min length: 4").max(35, "Max length: 35"),
    nickname: Yup.string().required("Nickname is required").min(2, "Min length: 2").max(35, "Max length: 35"),
});
