// authService.js
export const setAuthToken = (token) => {
  if (token) {
    // Store token in localStorage or sessionStorage
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Login method
export const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      // Adjust the URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { token } = data;
      setAuthToken(token);
      return data;
    } else {
      throw new Error(data.msg || "Login failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
