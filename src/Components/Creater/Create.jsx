import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import { db, fireBase } from "../../../firebase";
import Collection from "./Collection";
import { setColList } from "../../services/StateManage/NavBarCreate";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const [elName, setElName] = useState(null);
  const [elType, setElType] = useState(null);

  const { name } = useParams();

  const { colList } = useSelector((state) => state.NavBarCreate);

  const dispatch = useDispatch();

  let collList = [];

  const collectionList = collection(fireBase, "collection");

  const createNewElement = async () => {
    const data = {
      elName,
      elType,
    };

    const list = await addDoc(collectionList, data);
  };

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
      collList?.unshift(isExisted[i]._document?.data?.value?.mapValue?.fields);
    }
    collList.length === isExisted.length &&
      dispatch(
        setColList({
          colList: collList,
        })
      );
  };

  useEffect(() => {
    for (let i = 0; i < colList?.length; i++) {
      const element = document.createElement(colList[i]?.elType?.stringValue);
      element?.setAttribute("id", colList[i].elName?.stringValue);
    }

    getCol();
    navigate("/NavBar");
  }, []);

  const [Elements, setElements] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filterEl = colList.filter((dta) => dta.elName.stringValue == name);

    setElements(filterEl);
  }, [name]);

  return (
    <div
      id="main"
      draggable
      className=" z-[99999] fixed overflow-y-auto bottom-0  w-[100%] h-[200px] bg-[#212121] rounded p-2 "
    >
      <div
        id="colHold"
        className=" w-full flex flex-col justify-start items-start p-2 "
      >
        {/* <Collection id="coll" /> */}

        <div className=" flex w-full gap-3 max-w-full overflow-x-auto p-2 ">
          {colList?.length > 0 &&
            colList.map((data) => {
              return (
                <NavLink
                style={{
                  backgroundColor:data?.parent?.stringValue ? '#181818' :  '#310659'
                }}
                  to={`/${data.elName.stringValue}`}
                  key={data.elName.stringValue}
                  className="  rounded cursor-pointer flex p-2 gap-1 "
                >
                  {data?.parent?.stringValue && (
                    <div>
                      {data?.parent?.stringValue} {"/"}{" "}
                    </div>
                  )}
                  <div>{data.elName.stringValue}</div>
                </NavLink>
              );
            })}
        </div>

        {Elements?.length > 0 &&
          Elements.map((data) => {
            return <Collection data={data} key={data?.id} />;
          })}

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
    </div>
  );
};

export default Create;
