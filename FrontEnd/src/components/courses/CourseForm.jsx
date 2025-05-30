import { Button, DatePicker, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem, saveCourseAsync, getAllCourses } from "../../store/features/coursesSlice";
import { selectById } from "../../store/selectors/coursesSelectors";
import { useState } from "react";
import { courseSchema } from "../../validation/courseSchema";
import dayjs from "dayjs";

export default function CourseForm({ onSave, courseId }) {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");

  const currentCourse = useSelector((state) => selectById(state, courseId));

  const handleCourseSaveNew = async (values) => {
    const newCourse = { ...values, startDate: date };
    // dispatch(addItem(newCourse));
    // dispatch(saveCourseAsync(newCourse));
    await dispatch(saveCourseAsync(newCourse)).unwrap();
    await dispatch(getAllCourses());
    onSave();
  };

  const onChange = (dateMoment, dateString) => {
    setDate(dateString);
  };

  const handleCourseSaveEdit = (values) => {
    dispatch(editItem({ ...values, startDate: date, id: courseId }));
    onSave();
  };

  const createYupSync = (fieldName) => ({
    async validator(_, value) {
      try {
        await courseSchema.validateSyncAt(fieldName, { [fieldName]: value });
      } catch (e) {
        // throw new Error(e.message);
        return Promise.reject(e.message);
      }
    },
  });

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
      <h3>{courseId ? "Edit Course" : "Create Course"}</h3>
      <Form.Item
        label="Name"
        name="name"
        initialValue={courseId ? currentCourse.name : undefined}
        rules={[createYupSync("name")]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        initialValue={courseId ? currentCourse.description : undefined}
        rules={[]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Start date"
        name="startDate"
        initialValue={courseId ? dayjs(currentCourse?.startDate) : undefined}
        rules={[createYupSync("startDate")]}
      >
        <DatePicker onChange={onChange} />
      </Form.Item>

      <Button type="primary" htmlType="submit">Save</Button>

    </Form>
  );
}
