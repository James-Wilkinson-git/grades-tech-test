import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import intervalToDuration from "date-fns/intervalToDuration";
import parseISO from "date-fns/parseISO";
import { useState, useRef, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NewStudents() {
  const firstNameInput = useRef<HTMLInputElement>();
  const familyNameInput = useRef<HTMLInputElement>();
  const emailInput = useRef<HTMLInputElement>();
  const dobInput = useRef<HTMLInputElement>();
  const [ofAge, setOfAge] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNewStudent = (event: FormEvent) => {
    //Stop the form from doing form stuff
    event.preventDefault();
    //if any of our ref's didn't work exit the function
    if (
      firstNameInput.current === undefined ||
      familyNameInput.current === undefined ||
      emailInput.current === undefined ||
      dobInput.current === undefined
    ) {
      return;
    }
    //Validate DOB is at Least 10
    const dob = dobInput.current.value;
    const age = intervalToDuration({
      start: parseISO(dob as string),
      end: new Date(),
    }).years;
    if ((age as number) < 10) {
      setOfAge(true);
    } else {
      setOfAge(false);
      //If we already have students in local storage we want to get those and add to them
      const students = localStorage.getItem("Students") || "";
      const newStudents = [];
      const parseStudents = JSON.parse(students);
      newStudents.push(...parseStudents);
      newStudents.push({
        uuid: uuidv4(),
        firstName: firstNameInput.current.value,
        familyName: familyNameInput.current.value,
        email: emailInput.current.value,
        dob: dob,
      });
      //Save The Data
      localStorage.setItem("Students", JSON.stringify(newStudents));
      //Reset the Form
      firstNameInput.current.value = "";
      familyNameInput.current.value = "";
      emailInput.current.value = "";
      //Show the success message
      setSuccess(true);
    }
  };
  return (
    <>
      {ofAge && (
        <Alert severity="error">You must be at Least 10 years old</Alert>
      )}
      {success && <Alert severity="success">Student Submitted</Alert>}
      <Typography variant="h3">Add Student</Typography>
      <Divider />
      <form onSubmit={handleNewStudent}>
        <Box sx={{ paddingTop: "20px" }}>
          <Box sx={{ paddingTop: "20px" }}>
            First Name: <br />
            <Input required inputRef={firstNameInput} type="text" />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            Family Name: <br />
            <Input required inputRef={familyNameInput} type="text" />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            Email: <br />
            <Input required inputRef={emailInput} type="email" />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            Date of Birth: <br />
            <Input required inputRef={dobInput} type="date" />
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <Button color="primary" variant="contained" type="submit">
              Add Student
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
