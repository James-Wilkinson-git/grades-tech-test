import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { FormEvent, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NewCourses() {
  const courseInput = useRef<HTMLInputElement>();
  const handleNewCourse = (event: FormEvent) => {
    event.preventDefault();
    if (courseInput.current === undefined) {
      return;
    }
    const currentCourses = localStorage.getItem("Courses") || "";
    let newCourses;
    if (currentCourses) {
      const parseCurrentCourses = JSON.parse(currentCourses);
      newCourses = [
        ...parseCurrentCourses,
        { uuid: uuidv4(), courseName: courseInput.current.value },
      ];
    } else {
      newCourses = [
        {
          uuid: uuidv4(),
          courseName: courseInput.current.value,
        },
      ];
    }
    localStorage.setItem("Courses", JSON.stringify(newCourses));
  };
  return (
    <>
      <Typography variant="h3">New Courses</Typography>
      <form onSubmit={handleNewCourse}>
        <Box sx={{ paddingTop: "20px" }}>
          <Box sx={{ paddingTop: "20px" }}>
            Course Name: <br />
            <Input required inputRef={courseInput} type="text" />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <Button color="primary" variant="contained" type="submit">
              Add Course
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
