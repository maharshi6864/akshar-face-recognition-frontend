import { useEffect, useState } from "react";
import { trainSingleStudent } from "../apis/studentAction";
import { Button } from "react-bootstrap";

const StudentTableRow = ({
  student,
  index,
  handleOnCheckPresentAbsent,
  handleStudentSelect,
  handleStudentDelete,
  handleStudentEdit,
}) => {
  // Check if student and attendence_vo are defined
  if (!student || !student.attendence_vo) {
    return null; // Handle undefined student/attendence_vo scenario
  }

  const [pAndAStatus, setPAndAStatus] = useState(
    student.attendence_vo.status === "present"
  );

  const statusColor = pAndAStatus ? "text-success" : "";

  const handleSelect = () => {
    handleStudentSelect(student._id);
  };

  const toggleAttendanceStatus = () => {
    const newStatus = !pAndAStatus ? "present" : "absent";
    setPAndAStatus(!pAndAStatus);
    handleOnCheckPresentAbsent({
      attendence_id: student.attendence_vo._id,
      status: newStatus,
    });
  };

  const handleTrainStudent = async () => {
    await trainSingleStudent({
      student_list: [{ _id: student._id }],
    });
  };

  const handleOnDeleteStudent = () => {
    handleStudentDelete(student._id);
  };

  const handleOnEditStudent = () => {
    handleStudentEdit({ student_id: student._id });
  };

  return (
    <tr>
      <th scope="row">
        <input
          className="form-check-input"
          type="checkbox"
          checked={student.selected}
          onChange={handleSelect}
        />
      </th>
      <th className={`${statusColor}`} scope="row">
        {index + 1}
      </th>
      <td className={`${statusColor}`}>{student.enrollment_no}</td>
      <td className={`${statusColor}`}>{student.full_name}</td>
      <td className={`${statusColor}`}>{student.gender}</td>
      <td className={`${statusColor}`}>{student.age}</td>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={pAndAStatus}
            onChange={toggleAttendanceStatus}
          />
          <label className={`form-check-label ${statusColor}`}>
            {pAndAStatus ? "Present" : "Absent"}
          </label>
        </div>
      </td>
      <td>
        <button className="btn btn-primary mx-2" onClick={handleTrainStudent}>
          Train
        </button>
        <button className="btn btn-warning mx-2" onClick={handleOnEditStudent}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleOnDeleteStudent}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default StudentTableRow;
