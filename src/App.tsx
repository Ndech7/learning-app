import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HubsList from "./components/hubs-list.component";
import Hub from "./components/hub.component";
import AddHub from "./components/add-hub.component";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white">
      <div className="relative flex flex-wrap items-center content-between py-3 px-4 flex-no-wrap text-white bg-teal-700 ">
        <section className="flex p-2 ">
          <h1 className="inline-block mr-4 text-2xl whitespace-no-wrap text-slate-950">
            Learning App
          </h1>
          <nav className="flex flex-wrap list-reset pl-0 mb-0 mr-auto text-xl">
            <Link to="/" className="px-16">
              Home
            </Link>
            <Link to="/add" className="px-16">
              Add a Hub
            </Link>
          </nav>
        </section>
      </div>
      <div className="container mx-auto sm:px-4 mt-3">
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
