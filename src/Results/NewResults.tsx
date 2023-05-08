import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { FormEvent, useEffect, useRef, useState } from "react";
import { TCourse } from "../Courses/Courses";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { TStudent } from "../Students/Students";
import { v4 as uuidv4 } from "uuid";
import Alert from "@mui/material/Alert";
import NativeSelect from "@mui/material/NativeSelect";

export default function NewResults() {
  //Reused logic from courses and students
  const [courses, setCourses] = useState<TCourse[]>();
  const [students, setStudents] = useState<TStudent[]>();
  const [success, setSuccess] = useState(false);
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
  //New Logic
  const courseSelect = useRef<HTMLInputElement>();
  const studentSelect = useRef<HTMLInputElement>();
  const gradeSelect = useRef<HTMLInputElement>();
  const handleResultsSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      courseSelect.current === undefined ||
      studentSelect.current === undefined ||
      gradeSelect.current === undefined
    ) {
      return;
    }
    const localResults = localStorage.getItem("Results") || "[]";
    const newResults = [];
    const results = JSON.parse(localResults);
    newResults.push(...results);
    newResults.push({
      uuid: uuidv4(),
      course: courseSelect.current.value,
      student: studentSelect.current.value,
      grade: gradeSelect.current.value,
    });
    localStorage.setItem("Results", JSON.stringify(newResults));
    courseSelect.current.value = "";
    studentSelect.current.value = "";
    gradeSelect.current.value = "";
    setSuccess(true);
  };
  return (
    <>
      {success && <Alert severity="success">Result Submitted</Alert>}
      <Typography variant="h3">New Results</Typography>
      <Divider />
      <form onSubmit={handleResultsSubmit}>
        <Box sx={{ paddingTop: "20px" }}>
          <Box sx={{ paddingTop: "20px" }}>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <NativeSelect
              id="demo-simple-select"
              inputRef={courseSelect}
              required
            >
              {courses?.map((course) => {
                return (
                  <option key={course.uuid} value={course.courseName}>
                    {course.courseName}
                  </option>
                );
              })}
            </NativeSelect>
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <InputLabel id="demo-simple-select-label2">Student</InputLabel>
            <NativeSelect
              id="demo-simple-select"
              inputRef={studentSelect}
              required
            >
              {students?.map((student) => {
                return (
                  <option key={student.uuid} value={student.firstName}>
                    {student.firstName} {student.familyName}
                  </option>
                );
              })}
            </NativeSelect>
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <InputLabel id="demo-simple-select-label3">Grade</InputLabel>
            <NativeSelect
              id="demo-simple-select"
              inputRef={gradeSelect}
              required
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </NativeSelect>
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <Button color="primary" variant="contained" type="submit">
              Add Results
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
