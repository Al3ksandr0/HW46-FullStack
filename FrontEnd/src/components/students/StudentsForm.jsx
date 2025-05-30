import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, saveStudentAsync } from "../../store/features/studentsSlice";
import { selectById } from "../../store/selectors/studentsSelectors";
import { useState } from "react";
import { schema } from "../../validation/studentSchema";

const createYupSync = (fieldName) => ({
  async validator(_, value) {
    try {
      await schema.validateSyncAt(fieldName, { [fieldName]: value });
    } catch (e) {
      throw new Error(e.message);
    }
  },
});

export default function StudentsForm({ onSave, studentId }) {
  const dispatch = useDispatch();

  const currentStudent = useSelector(state => selectById(state, studentId));

  const handleStudentSaveNew = values => {
    // const id = Date.now();
    const newStudent = { ...values };
    // dispatch(addItem(newStudent));
    dispatch(saveStudentAsync(newStudent));
    onSave();
  }

  const handleStudentSaveEdit = values => {
    dispatch(editItem({ ...values, id: courseId }));
    onSave();
  }

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
      <h3>Create Student Form</h3>
      <Form.Item
        label="Fullname"
        name="fullname"
        initialValue={studentId && currentStudent.fullname}
        rules={[createYupSync('fullname')]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="City"
        name="city"
        initialValue={studentId && currentStudent.city}
        rule={[{ required: false }]}
      >
        <Select>
          <Select.Option value="Kyiv">Kyiv</Select.Option>
          <Select.Option value="Odessa">Odessa</Select.Option>
          <Select.Option value="NYC">New York</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  )
}