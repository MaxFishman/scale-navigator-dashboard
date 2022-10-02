import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { Provider } from "react-redux";
import store from "./store";
import { ChakraProvider } from "@chakra-ui/react";

import "./index.css";
import "./App.scss";
import "./resources/Mulish/Mulish-Regular.ttf";

ReactDOM.render(
    <React.StrictMode>
        <FirebaseContext.Provider value={new Firebase()}>
            <Provider store={store}>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </Provider>
        </FirebaseContext.Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
