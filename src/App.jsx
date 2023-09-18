import React from "react";
import Header from "./layouts/Header";
import { Routes, Route } from "react-router-dom";
import routes from "./router";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                path={route.path}
                element={route.element}
                key={index}
                exact
              />
            );
          })}
        </Routes>
      </main>
    </div>
  );
};

export default App;
