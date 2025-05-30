import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editItem, saveStudentAsync } from "../../store/features/studentsSlice";
import { selectById } from "../../store/selectors/studentsSelectors";
import { schema as studentSchema } from "../../validation/studentSchema";

const createYupSync = (fieldName) => ({
  async validator(_, value) {
    try {
      await studentSchema.validateSyncAt(fieldName, { [fieldName]: value });
    } catch (e) {
      // throw new Error(e.message);
      return Promise.reject(e.message);
    }
  },
});

export default function StudentsForm({ onSave, studentId }) {
  const dispatch = useDispatch();

  const currentStudent = useSelector(state => selectById(state, studentId));

  const handleStudentSaveNew = (values) => {
    dispatch(saveStudentAsync(values));
    onSave();
  };

  const handleStudentSaveEdit = (values) => {
    dispatch(editItem({ ...values, id: studentId }));
    onSave();
  };

  return (
    <Form
      name="student"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={!studentId ? handleStudentSaveNew : handleStudentSaveEdit}
      autoComplete="off"
      className="student-form"
    >
      <h3>{studentId ? "Edit Student" : "Create Student"}</h3>

      <Form.Item
        label="Fullname"
        name="fullname"
        initialValue={studentId ? currentStudent.fullname : undefined}
        rules={[createYupSync("fullname")]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        initialValue={studentId ? currentStudent.city : undefined}
        rules={[]}
      >
        <Select>
          <Select.Option value="Kyiv">Kyiv</Select.Option>
          <Select.Option value="Odessa">Odessa</Select.Option>
          <Select.Option value="NYC">New York</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  );
}
