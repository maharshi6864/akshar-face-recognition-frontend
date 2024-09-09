import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apis/register";
import { useForm } from "react-hook-form";

const EditModel = ({ setShow, students, show, loadingModel, editStudent }) => {
  const handleClose = () => setShow(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const password = watch("password");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    try {
      console.log(data);
      const response = await registerUser(data);
      console.log(response);
      if (response.message === "success") {
        setLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  const closeEditModel = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={closeEditModel}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Student Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingModel ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Enrollment Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="enrollment-number"
                      aria-describedby="emailHelp"
                      value={editStudent.enrollment_no}
                      disabled={true}
                      {...register("enrollment_no", {
                        required: "Enrollment Number is required.",

                        pattern: {
                          value: /^[0-9]{13}$/,
                          message: "Invalid Enrollment Number",
                        },
                      })}
                    />
                    {errors.enrollment_no && (
                      <p className="text-danger">
                        {errors.enrollment_no.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="full_name"
                      value={editStudent.full_name}
                      aria-describedby="emailHelp"
                      {...register("full_name", {
                        required: "Full name must be required.",
                      })}
                    />
                    {errors.full_name && (
                      <p className="text-danger">{errors.full_name.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-4">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Gender
                    </label>
                    <div className="d-flex">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          {...register("gender", {
                            required: "You must select one gender",
                          })}
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>

                      <div className="form-check mx-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          {...register("gender")}
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>

                      <div className="form-check mx-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="other"
                          value="other"
                          {...register("gender")}
                        />
                        <label className="form-check-label" htmlFor="female">
                          Other
                        </label>
                      </div>
                    </div>
                    {errors.gender && (
                      <p className="text-danger">{errors.gender.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-4">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="age"
                      value={editStudent.age}
                      {...register("age", {
                        pattern: {
                          value: /^[0-9]{2}$/,
                          message: "Invalid Age",
                        },
                        required: "Please enter your age",
                      })}
                    />
                    {errors.age && (
                      <p className="text-danger">{errors.age.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="form label" htmlFor="upload">
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
                        "File size must be less than 2MB", // Example: 2MB limit
                      type: (files) =>
                        ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Only JPEG or PNG files are allowed", // Example: restrict to specific file types
                    },
                  })}
                />
                {errors.face_image && (
                  <p className="text-danger">{errors.face_image.message}</p>
                )}
              </div>
              {loading ? (
                <button
                  type="submit"
                  disabled="disabled"
                  className="btn btn-primary w-100"
                >
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              )}
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditModel;
