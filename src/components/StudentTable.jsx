import { useState } from "react";
import StudentTableRow from "./StudentTableRow";

const StudentTable = ({
  students,
  handleOnCheckPresentAbsent,
  handleStudentSelect,
  selectAll,
  setSelectAll,
  handleStudentEdit,
  handleStudentDelete,
}) => {
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              {" "}
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={handleSelectAll}
                checked={selectAll}
              />
            </th>
            <th scope="col">#</th>
            <th scope="col">Enrollment Number</th>
            <th scope="col">Full Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Age</th>
            <th scope="col">Attendence</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentTableRow
              student={student}
              index={index}
              key={index}
              handleStudentEdit={handleStudentEdit}
              handleStudentSelect={handleStudentSelect}
              handleOnCheckPresentAbsent={handleOnCheckPresentAbsent}
              handleStudentDelete={handleStudentDelete}
            ></StudentTableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
