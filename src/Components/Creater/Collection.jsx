import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNavBg,
  setNavClass,
  setNavDisplay,
  setNavHeight,
  setNavWidth,
} from "../../services/StateManage/NavBarCreate";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { db, fireBase } from "../../../firebase";

const Collection = ({ data }) => {
  const [elName, setElName] = useState(null);
  const [elType, setElType] = useState(null);
  const [parent, setParent] = useState(data?.elName?.stringValue);

  const [bg, setBg] = useState(null);
  const [w, setW] = useState(null);
  const [h, setHeight] = useState(null);

  const { parentBg, parentH, parentW, parentDisplay, classNameNav } =
    useSelector((state) => state.NavBarCreate);

  const dispatch = useDispatch();

  const ref = collection(
    fireBase,
    data?.elName?.stringValue ? data?.elName?.stringValue : "*"
  );

  const [navCls, setNavCls] = useState([]);

  const getNavClass = async () => {
    const data = await getDocs(ref);
    setNavCls(data.docs[0]?._document?.data?.value?.mapValue?.fields);
  };

  useEffect(() => {
    getNavClass();
  }, []);

  const collectionList = collection(fireBase, "collection");

  const createNewElement = async () => {
    const data = {
      elName,
      elType,
      parent,
    };

    const list = await addDoc(collectionList, data);
  };

  const { colList } = useSelector((state) => state.NavBarCreate);

  //   useEffect(()=>{

  //     const colByParent = colList.filter(dta => dta.parent)

  //     for (let i = 0; i < colByParent.length; i++) {

  //         if (colByParent[i].parent) {
  //             const element = document.createElement(colByParent[i].elType.stringValue)
  //             const parentEl = document.getElementById(colByParent[i].parent.stringValue)
  //             element?.setAttribute('id',colByParent[i].elName.stringValue)

  //             const children = parentEl.querySelectorAll(`#${colByParent[i].elName.stringValue}`)

  //             if (children.length ==0) {
  //                 parentEl?.appendChild(element)
  //             }

  //         }

  //     }
  //   },[])

  return (
    <div
      key={data?.elName?.stringValue}
      id={data?.elName?.stringValue}
      className=" bg-[#333333] p-2 rounded w-full flex flex-col justify-start items-start  "
    >
      <h1 className=" flex px-1 py-4 text-[18px]  w-full text-center font-semibold  rounded-full ">
        {" "}
        {data?.elName?.stringValue}{" "}
      </h1>

      <div className=" w-full px-3 flex flex-col justify-start items-start ">
        <input
          placeholder="AdditionalClassName"
          className=" w-[90%] bg-[#212121] p-2 "
          value={
            classNameNav ? classNameNav : navCls?.classNameNav?.stringValue
          }
          onChange={(e) =>
            dispatch(setNavClass({ classNameNav: e.target.value }))
          }
          type="text"
          name="className"
          id=""
        />
      </div>

      <div className=" flex p-3  w-full justify-between items-center ">
        <div className=" flex w-[50%] justify-between items-center  ">
          <input
            placeholder="width"
            className=" w-[80%] bg-[#212121] p-2 "
            value={parentW ? parentW : navCls?.parentW?.stringValue}
            onChange={(e) => dispatch(setNavWidth({ parentW: e.target.value }))}
            type="text"
            name="width"
            id=""
          />
        </div>

        <div className=" flex w-[50%] justify-between items-center ">
          <input
            placeholder="height"
            className=" w-[80%] bg-[#212121] p-2 "
            value={parentH ? parentH : navCls?.parentH?.stringValue}
            onChange={(e) =>
              dispatch(setNavHeight({ parentH: e.target.value }))
            }
            type="text"
            name="height"
            id=""
          />
        </div>
      </div>

      <div className=" flex  p-3 w-full justify-start gap-3 ">
        <label htmlFor="color">BackgroundColor : </label>
        <input
          value={parentBg ? parentBg : navCls?.parentBg?.stringValue}
          onChange={(e) => dispatch(setNavBg({ parentBg: e.target.value }))}
          type="color"
          name="color"
          id=""
        />
      </div>

      <div className=" flex w-full p-3 gap-2 justify-start items-center ">
        <button
          onClick={createNewElement}
          className=" p-3 bg-[#181818] rounded "
          type="button"
        >
          Create New Element
        </button>

        <input
          value={elName}
          onChange={(e) => setElName(e.target.value)}
          className=" bg-[#181818] p-2 "
          placeholder="Element ID"
          type="text"
          name=""
          id=""
        />
        <input
          value={elType}
          onChange={(e) => setElType(e.target.value)}
          className=" bg-[#181818] p-2 "
          placeholder="Element Tag Type"
          type="text"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default Collection;
