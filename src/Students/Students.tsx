import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

export type TStudent = {
  uuid: string;
  firstName: string;
  familyName: string;
  email: string;
  dob: string;
};

export default function Students() {
  const [students, setStudents] = useState<TStudent[]>();
  //Get the students on load of the page from storage
  useEffect(() => {
    const getStudents = localStorage.getItem("Students") || "[]";
    if (getStudents) {
      const parseStudents = JSON.parse(getStudents);
      setStudents(parseStudents);
    }
  }, []);
  //When the state changes save it to local storage
  useEffect(() => {
    if (students !== undefined) {
      localStorage.setItem("Students", JSON.stringify(students));
    }
  }, [students]);

  const handleStudentDelete = (uuid: string) => {
    if (students !== undefined) {
      const newStudents = students?.filter((student) => student.uuid !== uuid);
      setStudents(newStudents);
      //When we delete a student also delete all the results attached to it.
      const student = students.filter((student) => student.uuid === uuid);
      const studentName = student[0].firstName;
      const results = localStorage.getItem("Results") || "[]";
      const parseResults = JSON.parse(results);
      const newResults = parseResults.filter(
        (result: any) => result.student !== studentName
      );
      localStorage.setItem("Results", JSON.stringify(newResults));
    }
  };

  return (
    <>
      <Typography variant="h3">Students</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Family Name</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student) => {
              return (
                <TableRow
                  key={student.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {student.firstName}
                  </TableCell>
                  <TableCell>{student.familyName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleStudentDelete(student.uuid);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
