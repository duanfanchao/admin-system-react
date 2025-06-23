import { memo } from "react";

const ReactMemo = memo(({ userId, onClick }) => {
  console.log("ReactMemo渲染");
  return (
    <div>
      <h4>用户id: {userId}</h4>
      <button onClick={onClick}>点击我</button>
    </div>
  );
});

export default ReactMemo;
