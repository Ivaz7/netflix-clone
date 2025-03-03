import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  avatarImgData: "",
  userName: "",
}

export const profileEditSlice = createSlice({
  name: "profileEditSlice",
  initialState,
  reducers: {
    setAvatarImgData: (state, action) => {
      state.avatarImgData = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    }
  }
})

export const { setAvatarImgData, setUserName } = profileEditSlice.actions;

export default profileEditSlice.reducer;