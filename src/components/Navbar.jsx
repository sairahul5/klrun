function Navbar({
  page,
  setPage,
  authenticated
}) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button
          className="brand-button"
          onClick={() =>
            setPage("register")
          }
        >
          KL RUN
        </button>

        <div className="nav-links">
          <button
            className={
              page === "register"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() =>
              setPage("register")
            }
          >
            Register
          </button>

          <button
            className={
              page === "students"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() =>
              setPage("students")
            }
          >
            Students
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;