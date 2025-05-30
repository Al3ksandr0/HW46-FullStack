import { Button, DatePicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, saveCourseAsync } from "../../store/features/coursesSlice";
import { selectById } from "../../store/selectors/coursesSelectors";
import { useState } from "react";

export default function CourseForm({onSave, courseId}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');

  const currentCourse = useSelector(state => selectById(state, courseId));

  const handleCourseSaveNew = values => {
    // const id = Date.now();
    const newCourse = {...values, startDate: date};
    dispatch(addItem(newCourse));
    dispatch(saveCourseAsync(newCourse));
    onSave();
  }

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  const handleCourseSaveEdit = values => {
    dispatch(editItem({...values, startDate: date, id: courseId}));
    onSave();
  }

  return (
    <Form
      name="course"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={!courseId ? handleCourseSaveNew : handleCourseSaveEdit}
      autoComplete="off"
      className="course-form"
    >
      <h3>Create Course Form</h3>
      <Form.Item
        label="Name"
        name="name"
        initialValue={courseId && currentCourse.name}
        rules={[{ required: true, message: "Please input the course name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        initialValue={courseId && currentCourse.description}
        rules={[{ required: false }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Start date"
        name="startDate"
        initialValue={courseId && currentCourse.startDate}
        rules={[{ required: true }]}
      >
        <DatePicker onChange={onChange} />
      </Form.Item>

      <Button type="primary" htmlType="submit">Save</Button>
      
    </Form>
  )
}