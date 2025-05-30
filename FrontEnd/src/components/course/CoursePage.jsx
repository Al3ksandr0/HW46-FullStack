import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { getCourse } from "../../store/features/courseSlice";
import StudentsList from "../students/StudentsList";

export default function CoursePage() {
  const {courseId} = useParams();
  const dispatch = useDispatch();
  const { course } = useSelector(state => state.course);
  console.log(course);
  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [courseId]);

  useEffect(() => {
    if (course.students.length) {
      // dispatch(getStudentsByIdsAsync(course.students))
    }
  }, [course])

  return (
    <div>
      <h3>CoursePage {courseId}</h3>
      <p>Name: {course.name}</p>
      <p>Description: {course.description}</p>
      <p>Start date: {course.startDate}</p>
      {/* <StudentsList items={} /> */}
    </div>
  )
}