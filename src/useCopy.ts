import { useRef, useEffect, useCallback } from 'react'

export const useCopy = () => {
  const copyRef = useRef<HTMLInputElement | null>(null)

  const copyToPaste = useCallback((value: string) => {
    copyRef.current?.setAttribute('value', value)
    copyRef.current?.select()
    document.execCommand('copy')
  }, [])

  useEffect(() => {
    const input = document.createElement('input')
    document.body.appendChild(input)
    copyRef.current = input
    return () => {
      document.body.removeChild(input)
      copyRef.current = null
    }
  }, [])
  return [copyToPaste]
}