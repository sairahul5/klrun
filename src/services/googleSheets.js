const API_URL =
  "https://script.google.com/macros/s/AKfycbwgP1EFNB2KmKkT08ryLEfV473nyKLJgj1y5ciHpoMk5r-O6pGT7ek4qgtdjGfG3D5sCw/exec";

const TOKEN_KEY =
  "student_portal_token";

export async function registerStudent(studentData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "register",
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone,
      gender: studentData.gender,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return await response.json();
}

export async function getStudents() {
  const token = sessionStorage.getItem(TOKEN_KEY);

  if (!token) {
    return {
      success: false,
      message: "Authentication required.",
    };
  }

  const url =
    `${API_URL}?action=getStudents&token=${encodeURIComponent(token)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success &&
      result.message === "Authentication required.") {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  return result;
}

export async function deleteStudent(id) {
  const token = sessionStorage.getItem(TOKEN_KEY);

  if (!token) {
    return {
      success: false,
      message: "Authentication required.",
    };
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action: "delete",
      id: id,
      token: token,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success &&
      result.message === "Authentication required.") {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  return result;
}
