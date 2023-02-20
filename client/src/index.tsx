import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./utils/fontawesome";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
