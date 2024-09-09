import { GLOBAL_URL } from "./globalUrl";

export const loadStudents = async () => {
  const response = await fetch(GLOBAL_URL + "getStudents", {
    method: "GET",
  });
  return response.json();
};

export const trainModel = async () => {
  const response = await fetch(GLOBAL_URL + "train", {
    method: "GET",
  });
  return response.json();
};

export const testModel = async () => {
  const response = await fetch(GLOBAL_URL + "test", {
    method: "GET",
  });
  return response.json();
};

export const markAttendence = async (data) => {
  const response = await fetch(GLOBAL_URL + "markAttendence", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const sendFrameToBackend = async (frameDataUrl) => {
  const response = await fetch(GLOBAL_URL + "receiveFrames", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: frameDataUrl }), // Send the image data
  });
  return response.json();
};
