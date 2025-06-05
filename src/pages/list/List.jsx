import { useState } from "react";

function List({ props }) {
  const [state, setstate] = useState(0);
  const handleClick = () => {
    setstate(state + 1);
  };
  return (
    <div>
      {state}
      <button onClick={handleClick}>点击</button>
    </div>
  );
}

export default List;
