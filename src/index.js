import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.scss";
import "./resources/Mulish/Mulish-Regular.ttf";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <FirebaseContext.Provider value={new Firebase()}>
            <Provider store={store}>
                <App />
            </Provider>
        </FirebaseContext.Provider>
    </React.StrictMode>
);
