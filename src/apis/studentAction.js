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

export const updateStudentDetails = async (data) => {
  const formData = new FormData();
  formData.append("_id", data._id);
  formData.append("enrollment_no", data.enrollment_no);
  formData.append("full_name", data.full_name);
  formData.append("gender", data.gender);
  formData.append("age", data.age);
  data.face_image[0] && formData.append("face_image", data.face_image[0]);
  const response = await fetch(GLOBAL_URL + "update_student", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
