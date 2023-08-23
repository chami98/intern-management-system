import Layout from "./components/layout/layout";
import AdminDashboardActions from "./components/adminDashboardActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <Layout title="InternX">
      <AdminDashboardActions />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </Layout>
  );
}

export default App;
