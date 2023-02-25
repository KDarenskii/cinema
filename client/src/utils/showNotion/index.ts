import { toast, ToastOptions } from "react-toastify";
import { NOTION } from "../../constants/notion";

const config: ToastOptions = {
    position: "top-right",
    autoClose: 700,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};

export const showNotion = (type: NOTION, message: string) => {
    switch (type) {
        case NOTION.SUCCESS:
            return toast.success(message, config);
        case NOTION.ERROR:
            return toast.error(message, config);
        default:
            return;
    }
};
