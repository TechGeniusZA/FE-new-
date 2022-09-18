import "./App.css";
import { useAuth } from "./Providers/Auth";
import Login from "./Pages/Auth/Login";
import Layout from "./Components/Layout/Layout";
import { Routes,Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";

import InventoryIndex from "./Pages/Inventory/InventoryIndex";

function App() {
  const auth = useAuth();
 
  return auth.isLoggedIn ? (
    <Layout>
      {/**Routes go here */}
      <Routes >
        <Route path="/" element={<Dashboard />}  />
        <Route path="/inventory" element={<InventoryIndex />}  />
        {/* <Route path="/inventory/SKUPackaging" element={<SKUpackaging />}  />
        <Route path="/inventory/SKUs" element={<SKU/>}  />
        <Route path="/inventory/SkuTag" element={<SkuTags/>}  />
        <Route path="/inventory/UoMConversions" element={<UoMConversions/>}  />
        <Route path="/inventory/Bundles" element={<Bundles/>}  />
        <Route path="/page1" element={<TestPageOne />}  />
        <Route path="/page2" element={<TestPageTwo />}  />
        <Route path="/page3" element={<TestPageThree />}  />
        <Route path="/page4" element={<TestPageFour />}  /> */}
      </Routes>

    </Layout>
  ) : (
   <Login/>
  );
}

export default App;
