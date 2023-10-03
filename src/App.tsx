import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

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
          <Route path="/"></Route>
          <Route path="/add"></Route>
          <Route path="/hubs/:id"></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
