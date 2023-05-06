import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Course from "./Course";
//In this version we use prop passing to showcase listing and deleting elements
export type TCourse = {
  uuid: string;
  courseName: string;
  handleCourseClick: (uuid: string) => void;
};

export default function Courses() {
  //Give ourselves state of the courses
  const [courses, setCourses] = useState<TCourse[]>();
  //On load get the courses from storage
  useEffect(() => {
    const storedCourses = localStorage.getItem("Courses") || "[]";
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      setCourses(parsedCourses);
    }
  }, []);
  //Delete courses we clicked on
  const handleCourseClick = (uuid: string) => {
    if (courses !== undefined) {
      const newCourses = courses.filter((course) => course.uuid !== uuid);
      setCourses(newCourses);
    }
  };
  // Once courses is changed save it back to local storage
  useEffect(() => {
    if (courses !== undefined) {
      localStorage.setItem("Courses", JSON.stringify(courses));
    }
  }, [courses]);
  return (
    <>
      <Typography variant="h3">Courses</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course) => {
              return (
                <Course
                  key={course.uuid}
                  uuid={course.uuid}
                  courseName={course.courseName}
                  handleCourseClick={handleCourseClick}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
