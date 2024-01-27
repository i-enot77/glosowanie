import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: { user: "" | null, accessToken: "" | null },
  persist: JSON.parse(localStorage.getItem("persist")) || false,
  errMsg: null,
};

const authenticationSlice = createSlice({
  name: "authauthentication",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = { ...state.auth, ...action.payload };
    },
    setPersist(state, action) {
      state.persist = action.payload;
    },
    setErrMsg(state, action) {
      state.errMsg = action.payload;
    },
  },
});

export const { setAuth, setPersist, setErrMsg } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
export const selectAuthentication = (state) => state.auth;
