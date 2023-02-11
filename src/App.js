import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./components/router";
import { UserAPIContext } from "./contexts/user";

function App() {
  return (
    <UserAPIContext value="">
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </UserAPIContext>
  );
}

export default App;
