import { useState, useCallback } from 'react';

export function useMouseMove (initialValue) {
  const [position, setPosition] = useState(initialValue);
  const handleMouseMove = useCallback((e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    let x = e.clientX - rect.left; // 计算相对于容器的X
    let y = e.clientY - rect.top;  // 计算相对于容器的Y
    // 限制红点不超出容器边界
    x = Math.max(0, Math.min(x, containerWidth));  // 限制在 [0, containerWidth] 之间
    y = Math.max(0, Math.min(y, containerHeight)); // 限制在 [0, containerHeight] 之间
    setPosition({ x, y });
  }, [])
  const mouseProps = {
    onMouseMove: handleMouseMove,
  }
  return [position, mouseProps];
}