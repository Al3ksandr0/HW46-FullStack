import * as Yup from "yup";

export const courseSchema = Yup.object().shape({
    name: Yup.string().required("Course name is required"),
    description: Yup.string(),
    startDate: Yup.string().required("Start date is required"),
});
