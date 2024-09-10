import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apis/register";
import { useForm } from "react-hook-form";

const EditModel = ({
  setShow,
  updateStudent,
  show,
  loadingModel,
  editStudent,
}) => {
  const handleClose = () => setShow(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const disImage = useRef(null);

  const face_image = watch("face_image");

  const handleImageOnChange = (event) => {
    const file = event.target.files[0];
    disImage.current.src = URL.createObjectURL(file);
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (editStudent.enrollment_no) {
      setValue("enrollment_no", editStudent.enrollment_no);
      setValue("full_name", editStudent.full_name);
      setValue("age", editStudent.age);
      setValue("gender", editStudent.gender); // Update the form field
      setValue("_id", editStudent._id); // Update the form field
    }
    // You can do the same for other fields like this:
    // setValue('field_name', editStudent.some_other_field);
  }, [editStudent]);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    const response = updateStudent(data);
    if (response) {
      setLoading(false);
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
                      type="hidden"
                      value={editStudent._id}
                      name="_id"
                      id=""
                      {...register("_id", {})}
                    />
                    <input
                      type="text"
                      className="form-control"
                      id="enrollment-number"
                      aria-describedby="emailHelp"
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
                          defaultChecked={editStudent.gender === "male"}
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
                          defaultChecked={editStudent.gender === "female"}
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
                          defaultChecked={editStudent.gender === "other"}
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
                <div className="row align-items-center">
                  <div className="col-6 ">
                    {" "}
                    <label className="form label" htmlFor="upload">
                      Change Face Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="face_image"
                      id="inputGroupFile01"
                      {...register("face_image", {
                        validate: {
                          size: (files) =>
                            !files[0] ||
                            files[0]?.size < 2 * 1024 * 1024 ||
                            "File size must be less than 2MB",
                          type: (files) =>
                            !files[0] ||
                            ["image/jpeg", "image/png"].includes(
                              files[0]?.type
                            ) ||
                            "Only JPEG or PNG files are allowed",
                        },
                        onChange: handleImageOnChange,
                      })}
                    />
                    {errors.face_image && (
                      <p className="text-danger">{errors.face_image.message}</p>
                    )}
                  </div>
                  <div className="col-6">
                    <div className="w-100">
                      <img
                        src={`http://localhost:5001/${editStudent.file_path}`}
                        alt=""
                        ref={disImage}
                        style={{ height: "250px", width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
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
                  Update
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
