import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Objective
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>to create a One Page App for Student Result Management System</li>
          <li>You can use any backend &amp; frontend technology.</li>
          <li>You can use any type of DB</li>
        </ul>
      </Typography>
      <Typography variant="h3" gutterBottom>
        Deliverables
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <p>
          Upon the receipt of the project, you have 24 hours to complete and
          deliver the following with us
        </p>
        <ul>
          <li>A github repository</li>
          <li>A presentation of the working app (15 minutes)</li>
        </ul>
      </Typography>
      <Typography variant="h3" gutterBottom>
        Application requirements
      </Typography>
      <Typography variant="h4" gutterBottom>
        Home page
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <ul>
          <li>
            Application must have a homepage that holds links to other pages as
            described below.
          </li>
          <li>
            The links must be on the left hand side of the page in a navigation
            bar Links to other pages are as follows:
            <ul>
              <li>Home</li>
              <li>Add New Students</li>
              <li>Students List</li>
              <li>Add New Courses</li>
              <li>Courses List</li>
              <li>Add New Results</li>
              <li>Results List</li>
            </ul>
          </li>
        </ul>
      </Typography>
    </>
  );
}
