import "./App.css";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
