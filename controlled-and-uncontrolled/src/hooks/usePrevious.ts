import { PropsWithoutRef, ComponentState, useEffect, useRef } from 'react'

/**
 * @author luo ad
 * @description 用于记录某个状态变量的上一次值
 */
function usePrevious<T>(value: PropsWithoutRef<T> | ComponentState) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

export default usePrevious