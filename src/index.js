import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { PostContextProvider } from "./context/postContext/PostContext";
import { HomeContextProvider } from "./context/homeContext/HomeContext";
import { AboutContextProvider } from "./context/aboutContext/AboutContext";
import { ServiceContextProvider } from "./context/serviceContext/ServiceContext";
import { PersonnelContextProvider } from "./context/personnelContext/PersonnelContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <HomeContextProvider>
          <AboutContextProvider>
            <ServiceContextProvider>
              <PersonnelContextProvider>
                <App />
              </PersonnelContextProvider>
            </ServiceContextProvider>
          </AboutContextProvider>
        </HomeContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
