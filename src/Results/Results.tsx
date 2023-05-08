import { useEffect, useState } from "react";
import { TCourse } from "../Courses/Courses";
import { TStudent } from "../Students/Students";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export type TResult = {
  uuid: string;
  course: string;
  student: string;
  grade: "A|B|C|D|E|F";
};

export default function Results() {
  const [results, setResults] = useState<TResult[]>();
  const [courses, setCourses] = useState<TCourse[]>();
  const [students, setStudents] = useState<TStudent[]>();
  useEffect(() => {
    const storedCourses = localStorage.getItem("Courses");
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      setCourses(parsedCourses);
    }
  }, []);
  useEffect(() => {
    const storedStudents = localStorage.getItem("Students");
    if (storedStudents) {
      const parsedCourses = JSON.parse(storedStudents);
      setStudents(parsedCourses);
    }
  }, []);
  useEffect(() => {
    const localResults = localStorage.getItem("Results") || "[]";
    const parsedResults = JSON.parse(localResults);
    setResults(parsedResults);
  }, []);
  //When results change save it to local storage
  useEffect(() => {
    if (results !== undefined) {
      localStorage.setItem("Results", JSON.stringify(results));
    }
  }, [results]);
  //Handle deleting of a result
  const handleResultDelete = (uuid: string) => {
    console.log(uuid);
    const newResults = results?.filter((result) => result.uuid !== uuid);
    setResults(newResults);
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((result) => {
              return (
                <TableRow
                  key={result.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {result.student}
                  </TableCell>
                  <TableCell>{result.course}</TableCell>
                  <TableCell>{result.grade}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleResultDelete(result.uuid);
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
