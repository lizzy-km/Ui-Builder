import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parentW: null,
  parentH: null,
  parentBg:null,
  parentDisplay:null,
  padding:null,
  paddingLeft:null,
  paddingRight:null,
  paddingTop:null,
  paddingBottom:null,
  margin:null,
  marginTop:null,
  marginBottom:null,
  marginLeft:null,
  marginRight:null,
  borderRadius:null,
  borderTopLeftRadius:null,
  borderTopRightRadius:null,
  borderBottomLeftRadius:null,
  borderBottomRightRadius:null,
  classNameNav:null,
  colList:[]
};

export const NavBarCreate = createSlice({
  name: "NavBarCreate",
  initialState,
  reducers: {
    
    setNavWidth: (state, { payload }) => {
      state.parentW = payload.parentW;
    },
    setNavHeight: (state, { payload }) => {
      state.parentH = payload.parentH;
    },
    setNavBg: (state, { payload }) => {
      state.parentBg = payload.parentBg;
    },
    setNavDisplay: (state, { payload }) => {
      state.parentDisplay = payload.parentDisplay;
    },
    setNavClass: (state, { payload }) => {
      state.classNameNav = payload.classNameNav;
    },
    setColList: (state, { payload }) => {

        state.colList = payload.colList ;

     
    },
  },
});

export const { setNavWidth,setNavHeight,setNavBg,setNavDisplay,setNavClass,setColList } = NavBarCreate.actions;
export default NavBarCreate.reducer;
