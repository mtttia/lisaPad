import { useEffect, useRef } from 'react';

function useTimeout(callback: () => void, delay: number, loop: boolean = false) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
        if (savedCallback.current) {
            savedCallback.current();
        }
        if (loop) {
            const id = setTimeout(tick, delay);
            return () => clearTimeout(id);
        }
        return () => {};
    }
    const id = setTimeout(tick, delay);
    return () => clearTimeout(id);
  }, [delay, loop]);
}

export default useTimeout;
