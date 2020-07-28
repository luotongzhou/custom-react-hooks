import { useEffect, useCallback, useState, useRef } from 'react'
import axios, { CancelTokenSource } from 'axios'
import { request, IRequestOptinos } from '@/shared/request/index'
import { useLifecycleRef } from './useLifecycle'

export type IFetcherType = (params: any) => Promise<any>

const {CancelToken} = axios

export const useRequest = (options: IRequestOptinos, lazy?: boolean) => {
  const lifecycleRef = useLifecycleRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const [resp, setResp] = useState<any>(null)
  const cancelRef = useRef<CancelTokenSource>()

  const initOptions = useRef(options)
  initOptions.current = options

  const refetch = useCallback(async (params?: IRequestOptinos) => {
    setLoading(true)
    cancelRef.current && cancelRef.current.cancel()
    const tmpCanceler = CancelToken.source()
    cancelRef.current = tmpCanceler
    const [err, respData] = await request({
      ...initOptions.current,
      ...params,
      cancelToken: tmpCanceler.token
    })
    if (err) {
      if (!axios.isCancel(err) && !lifecycleRef.current.isDestroyed) {
        cancelRef.current = undefined
        setResp(null)
        setError(err)
        setLoading(false)
      }
    } else {
      cancelRef.current = undefined
      if (!lifecycleRef.current.isDestroyed) {
        setResp(respData)
        setError(null)
        setLoading(false)
      }
    }
  }, [])
  useEffect(() => {
    if (!lazy) {
      refetch(initOptions.current)
    }
    return () => {
      cancelRef.current && cancelRef.current.cancel()
    }
  }, [])
  return {
    error,
    loading,
    resp,
    cancelRef,
    refetch
  }
}
