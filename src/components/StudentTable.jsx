import { useEffect, useState } from "react";
import {
  getStudents,
  deleteStudent,
} from "../services/googleSheets";

function StudentTable({
  refresh,
  onAuthenticationExpired,
}) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getStudents();

      if (result.success) {
        setStudents(result.students || []);
      } else {
        setError(
          result.message || "Unable to load students."
        );

        if (
          result.message === "Authentication required." &&
          onAuthenticationExpired
        ) {
          onAuthenticationExpired();
        }
      }
    } catch (error) {
      console.error("Load students error:", error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const result = await deleteStudent(id);

      if (result.success) {
        setStudents((previousStudents) =>
          previousStudents.filter(
            (student) =>
              String(student.id) !== String(id)
          )
        );
      } else {
        if (
          result.message === "Authentication required." &&
          onAuthenticationExpired
        ) {
          onAuthenticationExpired();
          return;
        }

        alert(
          result.message || "Delete failed."
        );
      }
    } catch (error) {
      console.error("Delete student error:", error);
      alert("Unable to delete student.");
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((previous) =>
        previous === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortArrow = (field) => {
    if (sortField !== field) {
      return "";
    }

    return sortDirection === "asc"
      ? " ↑"
      : " ↓";
  };

  const filteredStudents = students
    .filter((student) => {
      const searchText = search
        .trim()
        .toLowerCase();

      if (!searchText) {
        return true;
      }

      return (
        String(student.name || "")
          .toLowerCase()
          .includes(searchText) ||
        String(student.email || "")
          .toLowerCase()
          .includes(searchText) ||
        String(student.phone || "")
          .toLowerCase()
          .includes(searchText) ||
        String(student.gender || "")
          .toLowerCase()
          .includes(searchText)
      );
    })
    .sort((a, b) => {
      if (!sortField) {
        return 0;
      }

      const valueA = String(
        a[sortField] || ""
      ).trim();

      const valueB = String(
        b[sortField] || ""
      ).trim();

      const comparison = valueA.localeCompare(
        valueB,
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        }
      );

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

  if (loading) {
    return (
      <div className="table-card">
        <div className="loading">
          Loading students...
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <h2>Students</h2>

          <p>
            Total students: {students.length}
          </p>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      {error && (
        <div className="message error">
          {error}
        </div>
      )}

      {!error &&
        filteredStudents.length === 0 && (
          <div className="empty-state">
            {search
              ? "No students match your search."
              : "No students found."}
          </div>
        )}

      {!error &&
        filteredStudents.length > 0 && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No.</th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort("name")
                    }
                  >
                    Name
                    {getSortArrow("name")}
                  </th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort("email")
                    }
                  >
                    Email
                    {getSortArrow("email")}
                  </th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort("phone")
                    }
                  >
                    Phone
                    {getSortArrow("phone")}
                  </th>

                  <th
                    className="sortable"
                    onClick={() =>
                      handleSort("gender")
                    }
                  >
                    Gender
                    {getSortArrow("gender")}
                  </th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map(
                  (student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>

                      <td>
                        {student.name}
                      </td>

                      <td>
                        {student.email}
                      </td>

                      <td>
                        {student.phone}
                      </td>

                      <td>
                        {student.gender}
                      </td>

                      <td>
                        <button
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

export default StudentTable;