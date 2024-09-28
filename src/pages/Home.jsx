import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  testModel,
  trainModel,
  loadStudents,
  markAttendence,
  sendFrameToBackend,
} from "../apis/home";
import StudentTable from "../components/StudentTable";
import {
  deleteStudent,
  getStudentDetails,
  trainMultipleStudent,
  updateStudentDetails,
} from "../apis/studentAction";
import EditModel from "../components/EditModel";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [selectAll, setSelectedAll] = useState(false);
  const [trainLoading, setTrainLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState({});

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     const response = await loadStudents();
  //     if (response.message === "success") {
  //       let newStudents = response.students.map((student) => ({
  //         ...student,
  //         selected: false,
  //       }));
  //       setStudents(newStudents);
  //       setLoading(false);
  //     }
  //   };
  //   const intervalId = setInterval(() => {
  //     fetchStudents();
  //   }, 1000);
  //   return () => {
  //     clearInterval(intervalId); // Clear interval when the component unmounts
  //   };
  // }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await loadStudents();
      if (response.message === "success") {
        let newStudents = response.students.map((student) => {
          // Check if the student already has a present/absent status
          const status = statuses[student.id] || {
            present: false,
            absent: false,
          };
          return {
            ...student,
            selected: false,
            ...status, // Retain their present/absent status
          };
        });
        setStudents(newStudents);
        setLoading(false);
      }
    };
    fetchStudents();
  }, [statuses]); // Add `statuses` as a dependency to preserve status updates

  const updateStatus = (studentId, status) => {
    // Update the status for the particular student
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [studentId]: status,
    }));
  };

  const handleStudentDelete = async (student_id) => {
    const response = await deleteStudent({ student_id });
    if (response.status) {
      refreshTable();
    }
  };

  const refreshTable = async () => {
    setLoading(true);
    const response = await loadStudents();
    let newStudents = response.students.map((student) => {
      // Check if the student already has a present/absent status
      const status = statuses[student.id] || {
        present: false,
        absent: false,
      };
      return {
        ...student,
        selected: false,
        ...status, // Retain their present/absent status
      };
    });
    setStudents(newStudents);
    setLoading(false);
  };

  const handleStudentSelect = (id) => {
    let count = 0;
    let newStudents = students.map((student) => {
      if (student._id === id) {
        setSelectedAll(false);
        return { ...student, selected: !student.selected };
      }
      return student;
    });
    setStudents(newStudents);
    newStudents.forEach((student) => student.selected && count++);
    count === students.length && setSelectedAll(true);
  };

  const selectAndDeselectAllStudent = () => {
    setSelectedAll(!selectAll);
    let newStudents = students.map((student) => ({
      ...student,
      selected: !selectAll,
    }));
    setStudents(newStudents);
  };

  const navigate = useNavigate();

  const handleOnClickRegister = () => {
    navigate("/register");
  };

  const handleOnClickTrain = async () => {
    setTrainLoading(true);
    const studentIdList = students
      .filter((student) => student.selected)
      .map((student) => ({ _id: student._id }));

    if (studentIdList.length > 0) {
      const response = await trainMultipleStudent({
        student_list: studentIdList,
      });
      setTrainLoading(response.message === "success" ? false : true);
    } else {
      alert("No Student selected for training model");
      setTrainLoading(false);
    }
  };

  const handleOnClickTest = async () => {
    setTestLoading(true);
    navigate("/test");
    // const response = await testModel();
    // if (response.status) {
    //   setTestLoading(false);
    // }
  };

  const handleOnCheckPresentAbsent = async (student) => {
    await markAttendence(student);
  };

  const [show, setShow] = useState(false);
  const [loadingModel, setLoadingModel] = useState(false);
  const [editStudent, setEditStudent] = useState({
    _id: "",
    age: "",
    enrollment_no: "",
    file_path: "",
    full_name: "",
    gender: "",
  });
  const handleStudentEdit = async (data) => {
    setLoadingModel(true);
    setShow(true);
    const response = await getStudentDetails(data);
    if (response.status) {
      setLoadingModel(false);
      setEditStudent(response.student_detail);
    }
  };
  const date = new Date();
  const today = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const updateStudent = async (data) => {
    const response = await updateStudentDetails(data);
    if (response.status) {
      setLoading(false);
      refreshTable();
      setShow(false);
      return true;
    }
    return false;
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <div className="card w-75 h-75">
        <div className="card-header">
          <h2>
            Student Attendance Table {window.location.hostname}{" "}
            <span className="fs-5">({today})</span>
          </h2>
        </div>
        <div className="row">
          <div className="col-12 my-2">
            {trainLoading ? (
              <button type="button" disabled className="btn btn-primary mx-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary mx-3"
                onClick={handleOnClickTrain}
              >
                Train
              </button>
            )}
            {testLoading ? (
              <button type="button" disabled className="btn btn-primary mx-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary mx-3"
                onClick={handleOnClickTest}
              >
                Test
              </button>
            )}
            <button
              className="btn btn-primary mx-3"
              onClick={handleOnClickRegister}
            >
              Register
            </button>
          </div>
        </div>
        {loading ? (
          <div className="d-flex h-100 w-100 justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div
            className="card-body pt-0 border-top h-75"
            style={{ overflow: "auto" }}
          >
            {students.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center  h-100">
                <p className="fs-3 text-bold">No students registered</p>
              </div>
            ) : (
              <StudentTable
                students={students}
                selectAll={selectAll}
                handleStudentEdit={handleStudentEdit}
                setSelectAll={selectAndDeselectAllStudent}
                handleOnCheckPresentAbsent={handleOnCheckPresentAbsent}
                handleStudentSelect={handleStudentSelect}
                handleStudentDelete={handleStudentDelete}
              />
            )}
          </div>
        )}
        {/* Add CameraComponent here */}
        <EditModel
          show={show}
          setShow={setShow}
          editStudent={editStudent}
          loadingModel={loadingModel}
          updateStudent={updateStudent}
        ></EditModel>
      </div>
    </div>
  );
};

export default Home;
