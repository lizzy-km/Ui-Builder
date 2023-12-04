import { useSelector } from "react-redux";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import { db, fireBase } from "../../../firebase";
import { useEffect, useState } from "react";

const Content = ({ data }) => {
  const { parentBg, parentH, parentW, parentDisplay, classNameNav } =
    useSelector((state) => state.NavBarCreate);

  const [navCls, setNavCls] = useState([]);

  const ref = collection(fireBase, data.elName.stringValue);

  const handleClick = async () => {
    const data = {
      parentW,
      parentH,
      parentBg,
      parentDisplay,
      classNameNav,
    };

    const fire = await addDoc(ref, data);

    //  console.log(fire);
  };

  useEffect(() => {
    const getNavClass = async () => {
      const data = await getDocs(ref);
      setNavCls(data.docs[0]._document.data.value.mapValue.fields);
    };

    getNavClass();
  }, []);

  useEffect(()=>{
        // const element = document.createElement()
  },[])

  return (
    <section
      style={{
        height: parentH ? parentH : navCls?.parentH?.stringValue,
        width: parentW ? parentW : navCls?.parentW?.stringValue,
        backgroundColor: parentBg ? parentBg : navCls?.parentBg?.stringValue,
        position: "relative",
      }}
      className={
        classNameNav ? classNameNav : navCls?.classNameNav?.stringValue
      }
      id={data.elName.stringValue}
    >
      <a
        className=" cursor-pointer absolute top-0 right-0 p-3 bg-[#181818a3] rounded-bl-[20px] backdrop-blur "
        onClick={handleClick}
      >
        Save
      </a>
    </section>
  );
};

export default Content;
