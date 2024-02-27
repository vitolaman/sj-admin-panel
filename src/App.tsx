import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
