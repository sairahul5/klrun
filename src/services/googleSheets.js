const API_URL = "/api/exec";

const TOKEN_KEY =
  "student_portal_token";


/* ================================
   REGISTER STUDENT
================================ */

export async function registerStudent(
  studentData
) {
  const response =
    await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },

      body: JSON.stringify({
        action: "register",

        universityId:
          studentData.universityId,

        name:
          studentData.name,

        email:
          studentData.email,

        phone:
          studentData.phone,

        gender:
          studentData.gender
      })
    });

  if (!response.ok) {
    throw new Error(
      `HTTP error: ${response.status}`
    );
  }

  return await response.json();
}


/* ================================
   GET STUDENTS
================================ */

export async function getStudents() {
  const token =
    sessionStorage.getItem(
      TOKEN_KEY
    );

  if (!token) {
    return {
      success: false,
      message:
        "Authentication required."
    };
  }

  const params =
    new URLSearchParams({
      action: "getStudents",
      token: token
    });

  const response =
    await fetch(
      `${API_URL}?${params.toString()}`
    );

  if (!response.ok) {
    throw new Error(
      `HTTP error: ${response.status}`
    );
  }

  const result =
    await response.json();

  if (
    !result.success &&
    result.message ===
      "Authentication required."
  ) {
    sessionStorage.removeItem(
      TOKEN_KEY
    );
  }

  return result;
}


/* ================================
   DELETE STUDENT
================================ */

export async function deleteStudent(
  id
) {
  const token =
    sessionStorage.getItem(
      TOKEN_KEY
    );

  if (!token) {
    return {
      success: false,
      message:
        "Authentication required."
    };
  }

  const response =
    await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type":
          "text/plain;charset=utf-8"
      },

      body: JSON.stringify({
        action: "delete",
        id: id,
        token: token
      })
    });

  if (!response.ok) {
    throw new Error(
      `HTTP error: ${response.status}`
    );
  }

  const result =
    await response.json();

  if (
    !result.success &&
    result.message ===
      "Authentication required."
  ) {
    sessionStorage.removeItem(
      TOKEN_KEY
    );
  }

  return result;
}