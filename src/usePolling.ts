import { useEffect, useRef } from 'react'
/**
 *轮询定时器
 *fn:异步或同步函数
 *wait:轮询周期，为null时停止
 * @param {(() => (void | Promise<void | any>))} fn
 * @param {(number | null)} [wait=1000]
 */
const usePolling = (fn: () => (void | Promise<void | any>), wait: number | null = 1000) => {
  const pollFunc = useRef(fn)
  const flag = useRef(false)

  useEffect(() => {
    pollFunc.current = fn
  }, [fn])

  useEffect(() => {
    const excuteFunc = async () => {
      flag.current = true
      await pollFunc.current()
      flag.current = false
    }
    if (wait !== null) {
      const timer = setInterval(() => {
        if (!flag.current) {
          excuteFunc()
        }
      }, wait)
      return () => {
        timer && clearInterval(timer)
      }
    }
  }, [wait])
}

/* example
usePolling(async() => {
  await axios('/api/xxxx')
}, isRunning ? 3000 : null)
*/