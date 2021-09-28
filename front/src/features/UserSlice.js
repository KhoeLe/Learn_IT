import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APP_URL } from "./constants";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({username, password}, thunkAPI) => {
    try {
      const response = await fetch(
        `${APP_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            // formLogin
          }),
        }
      );
      let data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        localStorage.setItem('learning-mern', data.accessToken);
        return data;
      } else {

        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  });

export const registerUser = createAsyncThunk(
  "users/register",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch(
        `${APP_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            // formLogin
          }),
        }
      );
      let data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        localStorage.setItem('learning-mern', data.accessToken);
        return data;
      } else {

        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {}
  }
);
export const fetchUserByToken = createAsyncThunk(
  "users/fetchUserByToken",
  async ({ username, password }, thunkAPI) => {
    try {
    } catch (error) {}
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log("payLoad", payload);
      state.username = payload.username;
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = payload.message
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload__rejected", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },

    [registerUser.fulfilled]: (state, { payload }) => {
      console.log("payLoad", payload);
      state.username = payload.username;
      state.isFetching = false;
      state.isSuccess = true;
      state.successMessage = payload.message
      return state;
    },
    [registerUser.rejected]: (state, { payload }) => {
      console.log("payload__rejected", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [registerUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
