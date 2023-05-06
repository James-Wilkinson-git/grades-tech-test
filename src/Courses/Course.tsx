import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { TCourse } from "./Courses";

export default function Course({
  uuid,
  courseName,
  handleCourseClick,
}: TCourse) {
  return (
    <TableRow
      key={uuid}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {courseName}
      </TableCell>
      <TableCell>
        <IconButton
          onClick={() => {
            handleCourseClick(uuid);
          }}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
