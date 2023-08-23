import Layout from "./components/layout/layout";
import AdminDashboardActions from "./components/adminDashboardActions";
import CreateUserAccountDialog from "./components/createUserAccountDialog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "./components/ConfirmationDialogRaw";

function App() {
  return (
    <Layout title="InternX">
      <AdminDashboardActions />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </Layout>

    // <>
    // <ConfirmationDialog/>
    // </>
  );
}

export default App;
