import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import AdminDashboardActions from "./components/adminDashboardActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInSide from "./components/SignInSide";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignInSide />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
              />
            </>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <Layout title="InternX">
              <AdminDashboardActions />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
              />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
