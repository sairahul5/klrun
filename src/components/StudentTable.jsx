import {
  useEffect,
  useState
} from "react";

import {
  getStudents,
  deleteStudent
} from "../services/googleSheets";

function StudentTable({
  refresh,
  onAuthenticationExpired
}) {
  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [sortField, setSortField] =
    useState("");

  const [sortDirection, setSortDirection] =
    useState("asc");


  /* ================================
     LOAD STUDENTS
  ================================= */

  const loadStudents = async (
    showLoader = true
  ) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const result =
        await getStudents();

      if (result.success) {
        setStudents(
          result.students || []
        );
        return;
      }

      if (
        result.message ===
        "Authentication required."
      ) {
        if (
          onAuthenticationExpired
        ) {
          onAuthenticationExpired();
        }

        return;
      }

      setError(
        result.message ||
          "Unable to load students."
      );

    } catch (error) {
      setError(
        error.message ||
          "Unable to connect to the server."
      );

    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };


  /* ================================
     INITIAL LOAD
  ================================= */

  useEffect(() => {
    loadStudents(true);
  }, [refresh]);


  /* ================================
     REFRESH
  ================================= */

  const handleRefresh = async () => {
    if (refreshing) {
      return;
    }

    try {
      setRefreshing(true);
      setError("");

      const result =
        await getStudents();

      if (result.success) {
        setStudents(
          result.students || []
        );
        return;
      }

      if (
        result.message ===
        "Authentication required."
      ) {
        if (
          onAuthenticationExpired
        ) {
          onAuthenticationExpired();
        }

        return;
      }

      setError(
        result.message ||
          "Unable to refresh students."
      );

    } catch (error) {
      setError(
        error.message ||
          "Unable to refresh students."
      );

    } finally {
      setRefreshing(false);
    }
  };


  /* ================================
     DELETE
  ================================= */

  const handleDelete = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this student?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const result =
        await deleteStudent(id);

      if (result.success) {
        setStudents(
          (previousStudents) =>
            previousStudents.filter(
              (student) =>
                String(student.id) !==
                String(id)
            )
        );

        return;
      }

      if (
        result.message ===
        "Authentication required."
      ) {
        if (
          onAuthenticationExpired
        ) {
          onAuthenticationExpired();
        }

        return;
      }

      alert(
        result.message ||
          "Delete failed."
      );

    } catch (error) {
      alert(
        error.message ||
          "Unable to delete student."
      );
    }
  };


  /* ================================
     SORT
  ================================= */

  const handleSort = (
    field
  ) => {
    if (
      sortField === field
    ) {
      setSortDirection(
        (previous) =>
          previous === "asc"
            ? "desc"
            : "asc"
      );

      return;
    }

    setSortField(field);
    setSortDirection("asc");
  };


  const getSortArrow = (
    field
  ) => {
    if (
      sortField !== field
    ) {
      return "";
    }

    return sortDirection === "asc"
      ? " ↑"
      : " ↓";
  };


  /* ================================
     FILTER + SORT
  ================================= */

  const filteredStudents =
    students
      .filter((student) => {
        const searchText =
          search
            .trim()
            .toLowerCase();

        if (!searchText) {
          return true;
        }

        return (
          String(
            student.universityId ||
              ""
          )
            .toLowerCase()
            .includes(searchText) ||

          String(
            student.name || ""
          )
            .toLowerCase()
            .includes(searchText) ||

          String(
            student.email || ""
          )
            .toLowerCase()
            .includes(searchText) ||

          String(
            student.phone || ""
          )
            .toLowerCase()
            .includes(searchText) ||

          String(
            student.gender || ""
          )
            .toLowerCase()
            .includes(searchText)
        );
      })
      .sort((a, b) => {
        if (!sortField) {
          return 0;
        }

        const valueA =
          String(
            a[sortField] || ""
          ).trim();

        const valueB =
          String(
            b[sortField] || ""
          ).trim();

        const comparison =
          valueA.localeCompare(
            valueB,
            undefined,
            {
              numeric: true,
              sensitivity: "base"
            }
          );

        return sortDirection ===
          "asc"
          ? comparison
          : -comparison;
      });


  /* ================================
     LOADING
  ================================= */

  if (loading) {
    return (
      <div className="table-card loading-card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">Student</span>
            <span className="word">Data</span>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="table-card">

      <div className="table-header">

        <div>
          <h2>
            Students
          </h2>

          <p>
            Total students:{" "}
            {students.length}
          </p>
        </div>


        <div className="table-actions">

          <input
            className="search-input"
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />


          <button
            type="button"
            className="refresh-button"
            onClick={
              handleRefresh
            }
            disabled={refreshing}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={
                refreshing
                  ? "refresh-icon spinning"
                  : "refresh-icon"
              }
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />

              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>

        </div>

      </div>


      {error && (
        <div className="message error">
          {error}
        </div>
      )}


      {!error &&
        filteredStudents.length ===
          0 && (
          <div className="empty-state">
            {search
              ? "No students match your search."
              : "No students found."}
          </div>
        )}


      {!error &&
        filteredStudents.length >
          0 && (
          <div className="table-wrapper">

            <table>

              <thead>
                <tr>

                  <th>
                    No.
                  </th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort(
                        "universityId"
                      )
                    }
                  >
                    University ID
                    {getSortArrow(
                      "universityId"
                    )}
                  </th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort(
                        "name"
                      )
                    }
                  >
                    Name
                    {getSortArrow(
                      "name"
                    )}
                  </th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort(
                        "email"
                      )
                    }
                  >
                    Email
                    {getSortArrow(
                      "email"
                    )}
                  </th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort(
                        "phone"
                      )
                    }
                  >
                    Phone
                    {getSortArrow(
                      "phone"
                    )}
                  </th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort(
                        "gender"
                      )
                    }
                  >
                    Gender
                    {getSortArrow(
                      "gender"
                    )}
                  </th>

                  <th>
                    Action
                  </th>

                </tr>
              </thead>


              <tbody>

                {filteredStudents.map(
                  (
                    student,
                    index
                  ) => (
                    <tr
                      key={
                        student.id
                      }
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {
                          student.universityId
                        }
                      </td>

                      <td>
                        {
                          student.name
                        }
                      </td>

                      <td>
                        {
                          student.email
                        }
                      </td>

                      <td>
                        {
                          student.phone
                        }
                      </td>

                      <td>
                        {
                          student.gender
                        }
                      </td>

                      <td>
                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            handleDelete(
                              student.id
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

    </div>
  );
}

//exporting the student table

export default StudentTable;