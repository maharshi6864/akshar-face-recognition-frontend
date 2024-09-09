import { GLOBAL_URL } from "./globalUrl";

export const registerUser = async (data) => {
  const formData = new FormData();

  formData.append("enrollment_no", data.enrollment_no);
  formData.append("full_name", data.full_name);
  formData.append("gender", data.gender);
  formData.append("age", data.age);
  formData.append("face_image", data.face_image[0]);
  const response = await fetch(GLOBAL_URL + "register-student", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
