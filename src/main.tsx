import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Students from "./Students/Students.tsx";
import Home from "./Home/Home.tsx";
import Results from "./Results/Results.tsx";
import Courses from "./Courses/Courses.tsx";
import NewStudents from "./Students/NewStudents.tsx";
import NewCourses from "./Courses/NewCourses.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="students" element={<Students />} />
          <Route path="students/new" element={<NewStudents />} />
          <Route path="results" element={<Results />} />
          <Route path="results/new" element={<Results />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/new" element={<NewCourses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
