import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./components/router";
import { GoveeKeyProvider } from "./contexts/GoveeKeyContext";

function App() {
  return (
    <div className="App">
      <GoveeKeyProvider>
        <RouterProvider router={router} />
      </GoveeKeyProvider>
    </div>
  );
}

export default App;
