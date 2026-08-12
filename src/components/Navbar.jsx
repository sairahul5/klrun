function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div
          className="logo"
          onClick={() => setActivePage("register")}
        >
          Student Portal
        </div>

        <div className="nav-links">
          <button
            className={
              activePage === "register"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => setActivePage("register")}
          >
            Register
          </button>

          <button
            className={
              activePage === "students"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => setActivePage("students")}
          >
            Students
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;