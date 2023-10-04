import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HubsList from "./components/hubs-list.component";
import Hub from "./components/hub.component";
import AddHub from "./components/add-hub.component";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white">
      <div className="bg-teal-700 text-white sticky top-0 z-10">
        <section className="flex p-2 ">
          <h1 className="text-xl font-medium">Learning App</h1>
          <nav className="px-48 text-xl">
            <Link to="/" className="px-16">
              Home
            </Link>
            <Link to="/add" className="px-16">
              Add a Hub
            </Link>
          </nav>
        </section>
      </div>
      <div className="mt-3">
        <Routes>
          <Route path="/" element={<HubsList />}></Route>
          <Route path="/add" element={<AddHub />}></Route>
          <Route path="/hubs/:id" element={<Hub />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
