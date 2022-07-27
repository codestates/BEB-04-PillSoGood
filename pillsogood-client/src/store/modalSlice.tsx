import { configureStore, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

interface IResiter {
  verify: boolean;
  modalopen: boolean;
}
const initialState: IResiter = {
  verify: false,
  modalopen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setVerify: (state, action) => {
      state.verify = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalopen = action.payload;
    },
  },
});

export const modalActions = { ...modalSlice.actions };
