import React, { useState, useEffect } from "react";
import AdminNavbar from "./navbar";
import Footer from "../Footer";

export default function AllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedbacks from the backend API
    fetch("http://localhost:8000/api/auth/admin/feedbacks")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedbacks:", error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex-grow container mx-auto mt-20 px-4">
        <h1 className="text-center text-4xl font-bold mb-8 text-gray-800">
          User Feedbacks
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-lg shadow-lg p-6 h-48 flex flex-col justify-center items-center border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-lg font-semibold text-gray-700 mb-2">
                User ID: {feedback.userId}
              </p>
              <p className="text-gray-800 text-center font-bold">Message:
                {feedback.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
