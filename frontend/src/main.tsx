import React from "react";
import ReactDOM from "react-dom/client";
import { Page } from "./page";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-[#0c1024] h-full flex justify-center text-white pt-10">
      <div className="max-w-[500px]">
        <Page />
      </div>
    </div>
  </React.StrictMode>
);
