import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import { initializeFontIcons } from "./utils/initializeFontIcons";

import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";

initializeFontIcons();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={setupStore()}>
            <App />
        </Provider>
    </BrowserRouter>
);
