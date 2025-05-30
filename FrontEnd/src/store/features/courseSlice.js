import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  course: {
    name: "",
    description: "",
    startDate: "",
    amountOfLessons: 0,
    students: [],
  },
};

const serverUrl = "http://localhost:3000";

export const getCourse = createAsyncThunk("course/getCourse", async (id) => {
  const response = await fetch(`${serverUrl}/courses/${id}`);
  const result = await response.json();
  return result;
});

export const assignStudentAsync = createAsyncThunk(
  "course/assignStudentAsync",
  async ({ courseId, studentId }) => {
    const res = await fetch(
      `${serverUrl}/courses/assign-student/${courseId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      }
    );
    return res.json();
  }
);

export const unassignStudentAsync = createAsyncThunk(
  "course/unassignStudent",
  async ({ courseId, studentId }) => {
    const res = await fetch(
      `${serverUrl}/courses/unassign-student/${courseId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      }
    );
    return res.json();
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    assignStudent: (state, action) => {
      state.course.students.push(action.payload.studentId);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourse.fulfilled, (state, { payload }) => {
        state.course = payload;
      })
      .addCase(assignStudentAsync.fulfilled, (state, { payload }) => {
        state.course = payload;
      })
      .addCase(unassignStudentAsync.fulfilled, (state, { payload }) => {
        state.course = payload;
      });
  },
});

export const { assignStudent } = courseSlice.actions;

export default courseSlice.reducer;
