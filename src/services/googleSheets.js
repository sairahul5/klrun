const API_URL = "/api/exec";

const TOKEN_KEY =
  "student_portal_token";

const REQUEST_TIMEOUT = 15000;


async function fetchWithTimeout(
  url,
  options = {}
) {
  const controller =
    new AbortController();

  const timeoutId =
    setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT);

  try {
    const response =
      await fetch(url, {
        ...options,
        signal: controller.signal
      });

    return response;

  } catch (error) {
    if (
      error.name === "AbortError"
    ) {
      throw new Error(
        "Request timed out. Please try again."
      );
    }

    throw error;

  } finally {
    clearTimeout(timeoutId);
  }
}


/* =================================
   REGISTER STUDENT
================================= */

export async function registerStudent(
  studentData
) {
  const response =
    await fetchWithTimeout(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
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
      }
    );

  if (!response.ok) {
    throw new Error(
      `HTTP error: ${response.status}`
    );
  }

  return await response.json();
}


/* =================================
   GET STUDENTS
================================= */

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
    await fetchWithTimeout(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET"
      }
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


/* =================================
   DELETE STUDENT
================================= */

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
    await fetchWithTimeout(
      API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          action: "delete",
          id: id,
          token: token
        })
      }
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