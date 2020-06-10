import React, { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 *路由变化滚动到顶部
 *解决react-router路由跳转滚动条位置不变的问题
 *
 * @returns
 */
const useScrollToTop = () => {
	const { pathname } = useLocation()
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])
}

/**
 *路由变化滚动到顶部，且记录上次路径的滚动位置
 *
 */
const useRecoverScrollTop = () => {
	const { pathname } = useLocation()
	useEffect(() => {
		try {
			let scrollY = sessionStorage.getItem(pathname)
			scrollY && window.scrollTo(0, parseInt(scrollY))
		} catch (error) {
			throw error
		}
		return () => {
			try {
				sessionStorage.setItem(pathname, window.scrollY.toString())
			} catch (error) {
				throw error
			}
		}
	}, [pathname])
}
