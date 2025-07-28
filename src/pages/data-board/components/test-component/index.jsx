import { useState } from 'react';

function TestComponent() {
  const [state, setstate] = useState(0);
    console.log('测试组件');
  return (
    <div>
      测试组件
    </div>
  );
}

export default TestComponent;
