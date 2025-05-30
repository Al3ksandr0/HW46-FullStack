import { Button } from "antd";

export default function StudentCard({ onEdit, onDelete, ...student }) {

  return (
    <div>
      {student.fullname}
      <Button type="primary" onClick={() => onEdit(student.id)}>Edit</Button>
      <Button color="danger" onClick={() => onDelete(student.id)}>Delete</Button>
    </div>
  )
}