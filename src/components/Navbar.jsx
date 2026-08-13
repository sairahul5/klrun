function Navbar({
  page,
  setPage,
  authenticated
}) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <button
  type="button"
  className="brand-button"
  onClick={() => setPage("register")}
>
  <img
    src="/image.png"
    alt="KL RUNS"
    className="navbar-logo"
  />
  <span>KL RUNS</span>
</button>

        <div className="nav-links">

          <button
            type="button"
            className={
              page === "register"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => setPage("register")}
          >
            Register
          </button>

          <button
            type="button"
            className={
              page === "students"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => setPage("students")}
          >
            Students
          </button>

          <button
            type="button"
            className={
              page === "about"
                ? "nav-button active"
                : "nav-button"
            }
            onClick={() => setPage("about")}
          >
            About
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;