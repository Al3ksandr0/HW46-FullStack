import * as Yup from 'yup';

export const schema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required (YUP)"),
});