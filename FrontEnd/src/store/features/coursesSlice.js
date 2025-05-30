import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const coursesAdapter = createEntityAdapter();

const initialState = coursesAdapter.getInitialState();

const serverUrl = 'http://localhost:3000';

export const saveCourseAsync = createAsyncThunk('courses/saveCourse', async (data) => {
  const response = await fetch(`${serverUrl}/courses/`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const result = await response.json();
  return result;
});

export const getAllCourses = createAsyncThunk('courses/getCourses', async () => {
  const response = await fetch(`${serverUrl}/courses`);
  const result = await response.json();
  return result;
})

export const deleteCourseAsync = createAsyncThunk(
  "courses/deleteCourse",
  async (id) => {
    await fetch(`${serverUrl}/courses/${id}`, { method: "DELETE" });
    return id;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addItem: coursesAdapter.addOne,
    editItem: coursesAdapter.upsertOne,
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCourses.fulfilled, (state, { payload }) => {
        coursesAdapter.setAll(state, payload);
      })
      .addCase(saveCourseAsync.fulfilled, (state, { payload }) => {
        coursesAdapter.addOne(state, payload);
      })
      .addCase(deleteCourseAsync.fulfilled, (state, { payload }) => {
        coursesAdapter.removeOne(state, payload);
      });
  },
});

export const { addItem, editItem } = coursesSlice.actions;

export default coursesSlice.reducer;