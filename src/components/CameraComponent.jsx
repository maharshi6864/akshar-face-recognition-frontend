import React, { useRef, useEffect } from "react";
import { sendFrameToBackend } from "../apis/home";

const CameraComponent = ({ onFrameCaptured }) => {
  const videoRef = useRef(null);

  const handleFrameCaptured = async (frameDataUrl) => {
    // Here, send the captured frame to your backend for facial recognition
    // You can use fetch or any other method to send the data to your backend.
    console.log("Captured frame:", frameDataUrl);
    // Example (send to backend):
    const response = await sendFrameToBackend(frameDataUrl);
    // if(response.message === "success") { handle success }
  };

  useEffect(() => {
    // Access the webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing the camera", err);
      });

    // Capture frames at regular intervals
    const intervalId = setInterval(() => {
      captureFrame();
    }, 2000); // Capture frame every 1000 milliseconds (1 second)

    return () => {
      clearInterval(intervalId); // Clear interval when the component unmounts
    };
  }, []);

  // Capture a frame from the video
  const captureFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png"); // Capture frame as base64
      handleFrameCaptured(dataUrl); // Send frame to parent component
    }
  };

  return (
    <div>
      <h3>Live Camera Feed</h3>
      <video ref={videoRef} autoPlay width="720" height="560" />
    </div>
  );
};

export default CameraComponent;
