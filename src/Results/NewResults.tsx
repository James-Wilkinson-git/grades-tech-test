import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { FormEvent, useEffect, useRef, useState } from "react";
import { TCourse } from "../Courses/Courses";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { TStudent } from "../Students/Students";
import { v4 as uuidv4 } from "uuid";
import Alert from "@mui/material/Alert";

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
    //TODO: refactor to use regular inputs so useRef() works, does not play well with MUI
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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Course"
              inputRef={courseSelect}
              required
            >
              {courses?.map((course) => {
                return (
                  <MenuItem key={course.uuid} value={course.courseName}>
                    {course.courseName}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <InputLabel id="demo-simple-select-label2">Student</InputLabel>
            <Select
              labelId="demo-simple-select-label2"
              id="demo-simple-select"
              label="Course"
              inputRef={studentSelect}
              required
            >
              {students?.map((student) => {
                return (
                  <MenuItem key={student.uuid} value={student.firstName}>
                    {student.firstName} {student.familyName}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <InputLabel id="demo-simple-select-label3">Grade</InputLabel>
            <Select
              labelId="demo-simple-select-label3"
              id="demo-simple-select"
              label="Course"
              inputRef={gradeSelect}
              required
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
              <MenuItem value="E">E</MenuItem>
              <MenuItem value="F">F</MenuItem>
            </Select>
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
