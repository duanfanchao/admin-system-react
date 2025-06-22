import { useState, useImperativeHandle, forwardRef, useRef, useEffect } from "react";

const InputComponent = forwardRef((props, ref) => {
  console.log("props", props.count);
  const [val, setVal] = useState("");
  const inputRef = useRef(null);
  const onChange = (e) => {
    setVal(e.target.value);
  };
  useImperativeHandle(ref, () => ({
    inputValue: () => val,
    focus: () => inputRef.current.focus(),
  }));
  useEffect(() => {
    console.log('input-----useEffect');
  })
  useEffect(() => {
    console.log('input-----useEffect-----[]');
  }, [])
  return (
    <input
      {...props}
      ref={inputRef}
      value={val}
      onChange={(e) => onChange(e)}
    />
  );
});

export default InputComponent;
