import { selectUser } from "../store/user/selectors";
import { useAppSelector } from "./useAppSelector";

export const useUser = () => {
    const user = useAppSelector(selectUser);
    return user;
};
