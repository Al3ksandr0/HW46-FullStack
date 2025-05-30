import { Button } from "antd";
import { Link } from "react-router-dom";

export default function CourseCard({ onEdit, onDelete, ...course }) {

  return (
    <div>
      <Link to={`/course/${course.id}`}>{course.name}</Link>
      <Button type="primary" onClick={() => onEdit(course.id)}>Edit</Button>
      <Button color="danger" onClick={() => onDelete(course.id)}>Delete</Button>
    </div>
  )
}