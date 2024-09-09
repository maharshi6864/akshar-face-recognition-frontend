import { GLOBAL_URL } from "./globalUrl";

export const trainSingleStudent = async (data) => {
  const response = await fetch(GLOBAL_URL + "train", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const trainMultipleStudent = async (data) => {
  const response = await fetch(GLOBAL_URL + "train", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteStudent = async (data) => {
  const response = await fetch(GLOBAL_URL + "delete_student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getStudentDetails = async (data) => {
  const response = await fetch(GLOBAL_URL + "get_student_details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
