import { useState } from "react";

export function useNavBarCreate() {
  const [parentW, setParentW] = useState(0);
  const [parentH, setParentH] = useState(0);
  const [parentBg, setParentBg] = useState("#fff");

  return {
    parentW,
    setParentW,
    parentH,
    setParentH,
    parentBg,
    setParentBg,
  };
}
