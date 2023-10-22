import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import AdminDashboardActions from "./components/adminDashboardActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInSide from "./components/SignInSide";
import MentorDashboard from "./components/mentorDashboard";
import EvaluatorDashboard from "./components/evaluatorDashboard";
import ManagementDashboard from "./components/managementDashboard";
import InternDashboard from "./components/internDashboard";

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
        <Route
          path="/mentordashboard"
          element={
            <Layout title="InternX">
              <MentorDashboard />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
              />
            </Layout>
          }
        />
          <Route
          path="/evaluatordashboard"
          element={
            <Layout title="InternX">
              <EvaluatorDashboard />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
              />
            </Layout>
          }
        />
          <Route
          path="/managementdashboard"
          element={
            <Layout title="InternX">
              <ManagementDashboard />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
              />
            </Layout>
          }
        />
        <Route
          path="/interndashboard"
          element={
            <Layout title="InternX">
              <InternDashboard />
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
