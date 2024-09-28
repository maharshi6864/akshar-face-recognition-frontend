import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import { registerUser } from "../apis/register.js";
import { useForm } from "react-hook-form";
import {
  getAllBatchsForTeacher,
  getAllCoursesForTeacher,
  getSectionForTeacher,
} from "../apis/teacher/conductLecture";
import { springRegister } from "../apis/home.js";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");
  const [loading, setLoading] = useState(false);

  // State for course, batch, and section dropdowns
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");

  // Fetch courses
  const fetchCourses = async () => {
    const response = await getAllCoursesForTeacher();
    setCourses(response.body.course || []);
  };

  // Fetch batches based on selected course
  const fetchBatches = async (courseId) => {
    const response = await getAllBatchsForTeacher({ id: courseId });
    setBatches(response.body || []);
  };

  // Fetch sections based on selected batch
  const fetchSections = async (batchId) => {
    const response = await getSectionForTeacher({ id: batchId });
    setSections(response.body || []);
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Handlers for onChange events
  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    setSelectedBatch("");
    setSelectedSection("");
    fetchBatches(courseId);
  };

  const handleBatchChange = (event) => {
    const batchId = event.target.value;
    setSelectedBatch(batchId);
    setSelectedSection("");
    fetchSections(batchId);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(data);
      const response = await registerUser(data);
      if (response.message === "success") {
        let filePath = response.filePath;
        data = {
          enrollmentNumber: data.enrollment_no,
          firstName: data.full_name,
          lastName: data.full_name,
          studentEmailAddress: data.email,
          filePath: filePath,
          sectionId: selectedSection,
          courseId: selectedCourse,
        };
        console.log(data);
        const springResponse = await springRegister(data);
        console.log(springResponse);
        setLoading(false);
        // Navigate or do something on successful registration
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };

  return (
    <RegisterLoginLayout>
      <div className="card-title mb-4">
        {" "}
        <h2>Register Student</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Existing Form Fields */}

        {/* Select Course */}
        <div className="mb-3">
          <label htmlFor="course-select" className="form-label">
            Select Course
          </label>
          <select
            id="course-select"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="form-control"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>

        {/* Select Batch */}
        <div className="mb-3">
          <label htmlFor="batch-select" className="form-label">
            Select Batch
          </label>
          <select
            id="batch-select"
            value={selectedBatch}
            onChange={handleBatchChange}
            className="form-control"
            disabled={!selectedCourse}
          >
            <option value="">Select Batch</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.batchName}
              </option>
            ))}
          </select>
        </div>

        {/* Select Section */}
        <div className="mb-3">
          <label htmlFor="section-select" className="form-label">
            Select Section
          </label>
          <select
            id="section-select"
            value={selectedSection}
            onChange={handleSectionChange}
            className="form-control"
            disabled={!selectedBatch}
          >
            <option value="">Select Section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.sectionName}
              </option>
            ))}
          </select>
        </div>

        {/* Other Form Fields */}
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="enrollment-number" className="form-label">
                Enrollment Number
              </label>
              <input
                type="text"
                className="form-control"
                id="enrollment-number"
                {...register("enrollment_no", {
                  required: "Enrollment Number is required.",
                  pattern: {
                    value: /^[0-9]{13}$/,
                    message: "Invalid Enrollment Number",
                  },
                })}
              />
              {errors.enrollment_no && (
                <p className="text-danger">{errors.enrollment_no.message}</p>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="full_name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="full_name"
                {...register("full_name", {
                  required: "Full name is required.",
                })}
              />
              {errors.full_name && (
                <p className="text-danger">{errors.full_name.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        {/* Other fields and file upload */}
        <div className="mb-4">
          <label className="form-label" htmlFor="upload">
            Upload
          </label>
          <input
            type="file"
            className="form-control"
            name="face_image"
            id="inputGroupFile01"
            {...register("face_image", {
              required: "File upload is required",
              validate: {
                size: (files) =>
                  files[0]?.size < 2 * 1024 * 1024 ||
                  "File size must be less than 2MB",
                type: (files) =>
                  ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                  "Only JPEG or PNG files are allowed",
              },
            })}
          />
          {errors.face_image && (
            <p className="text-danger">{errors.face_image.message}</p>
          )}
        </div>

        <div className="mb-4 text-center">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Register"
          )}
        </button>
        <a href="https://localhost:5173/admin/dashboard">
          <button type="button" className="btn btn-dark w-100 my-2">
            Back
          </button>
        </a>
      </form>
    </RegisterLoginLayout>
  );
};

export default Register;
