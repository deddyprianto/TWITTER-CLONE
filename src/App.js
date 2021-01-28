import React from "react";
import "./App.css";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import { statevalueProvider } from "./StateProvider";
import Login from "./Login";
function App() {
  const [{ login }, dispatch] = statevalueProvider();
  return (
    <div className="App">
      {!login ? (
        <Login />
      ) : (
        <>
          <Sidebar />
          <Feed />
          <Widgets />
        </>
      )}
    </div>
  );
}

export default App;
