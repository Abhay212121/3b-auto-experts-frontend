import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import SalesForm from "./components/SalesForm";
import PurchaseForm from "./components/PurchaseForm";
import Aryan from "./components/Aryan";
import Anshu from "./components/Anshu";
import Ronak from "./components/Ronak";
import Login from "./components/Login";
import NewProduct from "./components/NewProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/sales"
          element={<SalesForm />}
        />
        <Route
          path="/aryan"
          element={<Aryan />}
        />
        <Route
          path="/anshu"
          element={<Anshu />}
        />
        <Route
          path="/purchases"
          element={<PurchaseForm />}
        />
        <Route
          path="/ronak"
          element={<Ronak />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/newproduct"
          element={<NewProduct />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
