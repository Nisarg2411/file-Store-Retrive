import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  fetchedUser: [],
  message: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const uploadFile = createAsyncThunk(
  "user/uploadFile",
  async (formData, thunkAPI) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await axios.post("/api/upload", formData, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAll = createAsyncThunk("user/getFiles", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/getAll");
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fetchedUser.push(action.payload);
      })

      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fetchedUser = action.payload;
      })

      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export default userSlice.reducer;
