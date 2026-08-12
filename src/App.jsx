import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import RegistrationForm from "./components/RegistrationForm";
import StudentTable from "./components/StudentTable";
import TotpVerification from "./components/TotpVerification";

function App() {
  const [activePage, setActivePage] = useState("register");
  const [refreshStudents, setRefreshStudents] = useState(0);
  const [authenticated, setAuthenticated] = useState(
    Boolean(
      sessionStorage.getItem("student_portal_token")
    )
  );

  const handleRegistrationSuccess = () => {
    setRefreshStudents((previous) => previous + 1);
  };

  const handleStudentsClick = () => {
    setActivePage("students");
  };

  const handleTotpVerified = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(
      "student_portal_token"
    );

    setAuthenticated(false);
    setActivePage("register");
  };

  return (
    <div className="app">
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          if (page === "students") {
            handleStudentsClick();
          } else {
            setActivePage(page);
          }
        }}
      />

      <main className="main-container">
        {activePage === "register" && (
          <section className="page-section">
            <div className="page-header">
              <h1>Student Registration</h1>

              <p>
                Register a new student by filling in
                the form below.
              </p>
            </div>

            <RegistrationForm
              onRegistrationSuccess={
                handleRegistrationSuccess
              }
            />
          </section>
        )}

        {activePage === "students" && (
          <section className="page-section">
            {!authenticated ? (
              <>
                <div className="page-header">
                  <h1>Student Access</h1>

                  <p>
                    Authentication is required to view
                    student data.
                  </p>
                </div>

                <TotpVerification
                  onVerified={handleTotpVerified}
                />
              </>
            ) : (
              <>
                <div className="page-header">
                  <div>
                    <h1>Registered Students</h1>

                    <p>
                      View and manage registered students.
                    </p>
                  </div>

                  <button
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    Lock
                  </button>
                </div>

                <StudentTable
  refresh={refreshStudents}
  onAuthenticationExpired={() => {
    sessionStorage.removeItem(
      "student_portal_token"
    );

    setAuthenticated(false);
  }}
/>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;