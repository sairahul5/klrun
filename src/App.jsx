import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";
import StudentTable from "./components/StudentTable";
import TotpVerification from "./components/TotpVerification";

function App() {
  const [page, setPage] = useState("register");
  const [refresh, setRefresh] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);

  const handleRegistered = () => {
    setRefresh((previous) => previous + 1);
  };

  const handleAuthenticationSuccess = () => {
    setAuthenticated(true);
  };

  const handleAuthenticationExpired = () => {
    setAuthenticated(false);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <>
      <Navbar
        page={page}
        setPage={setPage}
        authenticated={authenticated}
        onLogout={handleLogout}
      />

      <main className="app-container">
        {page === "register" && (
          <RegistrationForm
            onRegistered={handleRegistered}
          />
        )}

        {page === "students" && (
          <>
            {!authenticated ? (
              <div className="page-content">
                <h1>Student Access</h1>

                <p className="page-description">
                  Authentication is required to view student data.
                </p>

                <TotpVerification
                  onVerified={handleAuthenticationSuccess}
                />
              </div>
            ) : (
              <div>
                <div className="students-heading">
                  <h1>Registered Students</h1>

                  <p>
                    View and manage registered students.
                  </p>

                  <button
                    type="button"
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>

                <StudentTable
                  refresh={refresh}
                  onAuthenticationExpired={
                    handleAuthenticationExpired
                  }
                />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;