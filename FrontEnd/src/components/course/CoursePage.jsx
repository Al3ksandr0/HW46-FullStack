import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { getCourse, assignStudentAsync, unassignStudentAsync } from "../../store/features/courseSlice";
import { getAllStudents } from "../../store/features/studentsSlice";
import { selectAll as selectStudents } from "../../store/selectors/studentsSelectors";
import StudentsList from "../students/StudentsList";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Select, Spin } from "antd";

const AssignSchema = Yup.object().shape({
  studentId: Yup.string().required("Select a student"),
});

export default function CoursePage() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { course } = useSelector(state => state.course);
  const students = useSelector(selectStudents);

  useEffect(() => {
    dispatch(getCourse(courseId));
    dispatch(getAllStudents());
  }, [courseId, dispatch]);

  if (!course) return <Spin />; // чтобы не крашило если name пустой

  const assignedStudents = students.filter((s) =>
    course.students.includes(s.id)
  );

  return (
    <div>
      <h3>Course: {course.name}</h3>
      <p>{course.description}</p>
      <p>Start: {course.startDate}</p>

      <h4>Assign a student</h4>
      <Formik
        initialValues={{ studentId: "" }}
        validationSchema={AssignSchema}
        onSubmit={async (values, { resetForm }) => {
          await dispatch(
            assignStudentAsync({ courseId, studentId: values.studentId })
          ).unwrap();
          resetForm();
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue, values }) => (
          <Form>
            <Select
              showSearch
              placeholder="Select student"
              style={{ width: 240 }}
              value={values.studentId}
              onChange={(val) => setFieldValue("studentId", val)}
            >
              {students.map((s) => (
                <Select.Option key={s.id} value={s.id}>
                  {s.fullname}
                </Select.Option>
              ))}
            </Select>
            {errors.studentId && touched.studentId && (
              <div style={{ color: "red" }}>{errors.studentId}</div>
            )}
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              style={{ marginLeft: 8 }}
            >
              Assign
            </Button>
          </Form>
        )}
      </Formik>

      <h4>Assigned students</h4>
      {assignedStudents.length > 0 ? (
        <StudentsList
          items={assignedStudents}
          onDelete={(id) =>
            dispatch(unassignStudentAsync({ courseId, studentId: id }))
          }
        />
      ) : (
        <p>No students assigned yet.</p>
      )}
    </div>
  );
}