import { useRef, useEffect } from 'react'

/**
 *判断组件是否挂载和卸载的状态
 *
 * @returns {mountedRef}
 */
export const useLifecycleRef = () => {
  const mountedRef = useRef({
    isMounted: false,
    isDestroyed: false
  })
  useEffect(() => {
    mountedRef.current = { isMounted: true, isDestroyed: false }
    return () => {
      mountedRef.current = { isMounted: false, isDestroyed: true }
    }
  }, [])
  return mountedRef
}