import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "antd";

import { selectAll } from "../../store/selectors/coursesSelectors";
import CoursesList from "./CoursesList";
import CourseForm from "./CourseForm";
import { getAllCourses, deleteCourseAsync } from "../../store/features/coursesSlice";

export default function CoursesPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const data = useSelector(selectAll);

  const [isAddFormShown, setIsAddFormShown] = useState(false);
  const [isEditModalShown, setIsEditModalShown] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  const handleSaveCourse = () => {
    hideAddCourseForm();
  }

  const showAddCourseForm = () => {
    setIsAddFormShown(true);
  }

  const hideAddCourseForm = () => {
    setIsAddFormShown(false);
  }

  const handleCourseEdit = (id) => {
    setEditCourseId(id);
    setIsEditModalShown(true);
  };

  const hideEditModal = () => {
    setIsEditModalShown(false);
  }

  const handleCourseDelete = (id) => {
    // todo: double-check if user wants to delete
    if (window.confirm("Delete this course?")) {
      dispatch(deleteCourseAsync(id));
    }
  };

  return (
    <div>
      <h3>CoursesPage</h3>
      <Button type="primary" onClick={showAddCourseForm}>Add Course</Button>
      {isAddFormShown && <CourseForm onSave={handleSaveCourse} />}
      <CoursesList items={data} onEdit={handleCourseEdit} onDelete={handleCourseDelete} />

      <Modal title="Edit Course" open={isEditModalShown} onCancel={hideEditModal} footer={null}>
        <CourseForm key={editCourseId} courseId={editCourseId} onSave={hideEditModal} />
      </Modal>
    </div>
  );
}
