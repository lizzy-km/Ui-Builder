import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs, addDoc } from "@firebase/firestore";
import { db, fireBase } from "../../../firebase";
import Content from "./Content";
import { setColList } from "../../services/StateManage/NavBarCreate";

const Receive = () => {
  const [elName, setElName] = useState(null);
  const [elType, setElType] = useState(null);

  const { parentBg, parentH, parentW, parentDisplay, classNameNav, colList } =
    useSelector((state) => state.NavBarCreate);
  const dispatch = useDispatch();

  const [navCls, setNavCls] = useState([]);


  let collList = [];

  const collectionList = collection(fireBase, "collection");

  const getCol = async () => {
    const { docs } = await getDocs(collectionList);

    const isExisted =
      docs.length > 0 &&
      docs?.filter(
        (dta) =>
          dta?._document?.data?.value?.mapValue?.fields?.elName?.stringValue !==
          collList?.elName?.stringValue
      );


    for (let i = 0; i < isExisted.length; i++) {

      collList?.unshift(isExisted[i]._document?.data?.value?.mapValue?.fields)

      
    }
    collList.length === isExisted.length && dispatch(
      setColList({
        colList: collList
      })
    )
   
  };

 

  useEffect(() => {
    for (let i = 0; i < colList?.length; i++) {
      const element = document.createElement(colList[i]?.elType?.stringValue);
      element?.setAttribute("id", colList[i].elName?.stringValue);
    }

    getCol();
  }, []);

  // const createNewElement = async()=>{

  //   const data = {
  //     elName,
  //     elType
  //   }

  //   const list = await addDoc(collectionList,data);

  // }


  


  return (
    <div className=" relative flex flex-col gap-3  w-[100%] h-full bg-[#111111] rounded-r p-2 ">

      {colList.length > 0 &&
        colList.map((data) => {
          if (!data.parent) {
            return <Content key={data?.id} data={data} />;
          }
          
        })}

      
    </div>
  );
};

export default Receive;
