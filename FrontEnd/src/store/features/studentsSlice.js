import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const studentsAdapter = createEntityAdapter();

const initialState = studentsAdapter.getInitialState();

const serverUrl = 'http://localhost:3000';

export const saveStudentAsync = createAsyncThunk('students/saveStudent', async (data) => {
  const response = await fetch(`${serverUrl}/students/`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const result = await response.json();
  return result;
});

export const getAllStudents = createAsyncThunk('students/getStudents', async () => {
  const response = await fetch(`${serverUrl}/students`);
  const result = await response.json();
  return result;
})

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await fetch(`${serverUrl}/students/${id}`, { method: "DELETE" });
    return id;
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addItem: studentsAdapter.addOne,
    editItem: studentsAdapter.upsertOne,
  },
  extraReducers: builder => {
    builder
      .addCase(saveStudentAsync.fulfilled, (state, { payload }) => {
        studentsAdapter.addOne(state, payload);
      })
      .addCase(getAllStudents.fulfilled, (state, { payload }) => {
        studentsAdapter.setAll(state, payload);
      })
      .addCase(deleteStudentAsync.fulfilled, (state, { payload }) => {
        studentsAdapter.removeOne(state, payload);
      });
  },
});

export const { addItem, editItem } = studentsSlice.actions;

export default studentsSlice.reducer;