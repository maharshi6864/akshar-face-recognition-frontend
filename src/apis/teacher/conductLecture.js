import { GLOBAL_URL_2 } from "../globalUrl";

export const getAllCoursesForTeacher = async () => {
  const response = await fetch(GLOBAL_URL_2 + "course/getAllCourse", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    alert("Invalid Username or password");
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getAllBatchsForTeacher = async (data) => {
  const response = await fetch(GLOBAL_URL_2 + "batch/getAllBatchByCourse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    alert("Invalid Username or password");
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getSectionForTeacher = async (data) => {
  const response = await fetch(
    GLOBAL_URL_2 + "section/getAllSectionByBatchId",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );

  if (!response.ok) {
    alert("Invalid Username or password");
    throw new Error("Network response was not ok");
  }
  return response.json();
};
