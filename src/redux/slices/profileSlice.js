import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {},
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    setProfile: (state, action) => {
        state.profile = action.payload
    },

    setProfileClear:(state, action) => {
            state.profile = {}; 
    },

    
  },
});

export const { setProfile, setProfileClear } = ProfileSlice.actions;

export default ProfileSlice.reducer;
