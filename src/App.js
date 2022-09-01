import "./App.css";
import { useAuth } from "./Providers/Auth";
import Login from "./Pages/Auth/Login";
import Layout from "./Components/Layout/Layout";
import { Routes,Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TestPageOne from './Pages/TestPages/TestPageOne'
import TestPageTwo from './Pages/TestPages/TestPageTwo'
import TestPageThree from './Pages/TestPages/TestPageThree'
import TestPageFour from './Pages/TestPages/TestPageFour'
import SKUBrands from "./Pages/Inventory/SKUBrands";
function App() {
  const auth = useAuth();
 
  return auth.isLoggedIn ? (
    <Layout>
      {/**Routes go here */}
      <Routes >
        <Route path="/" element={<Dashboard />}  />
        <Route path="/inventory/SKUBrands" element={<SKUBrands />}  />
        <Route path="/page1" element={<TestPageOne />}  />
        <Route path="/page2" element={<TestPageTwo />}  />
        <Route path="/page3" element={<TestPageThree />}  />
        <Route path="/page4" element={<TestPageFour />}  />
      </Routes>

    </Layout>
  ) : (
   <Login/>
  );
}

export default App;
