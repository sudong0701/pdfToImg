import { GlobalWorkerOptions, getDocument, PDFWorker } from 'pdfjs-dist'
import {pdfToImgFncConfig } from '../types/index'
GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js'

/**
	* pdf转图片方法
	* @param {Object} {
		{String} url pdf文件的url,
		{Number} scale 转换后的倍数 倍数越大图片越大约清晰,
		{Boolean} isIntegrate 是否整合为一张图片
	} 配置参数 
	* @return
*/

const pdfToImg: pdfToImgFncConfig = ({ url, scale = 1, isIntegrate = false }) => {
	return new Promise((resolve, reject) => {
		try {
			const isEmptyArray = (arr:Array<any>):boolean => {
				for (let i = 0; i < arr.length; i++) {
					if (!arr[i])
						return true;
				}
				return false;
			}
			const loadingTask = getDocument(url)
			loadingTask.promise.then((pdf) => {
				const pageNum: number = pdf.numPages, imgSrcArr: Array<string> = []
				for (let i = 0; i < pageNum; i++) {
					pdf.getPage(i + 1).then((page) => {
						const viewport = page.getViewport({ scale: scale })
						viewport.width = viewport.width
						viewport.height = viewport.height
						const canvas = document.createElement("canvas")
						const context = canvas.getContext('2d')
						canvas.width = viewport.width
						canvas.height = viewport.height
						const renderContext = {
							canvasContext: context as CanvasRenderingContext2D,
							viewport: viewport
						}
						const renderTask = page.render(renderContext)
						renderTask.promise.then(() => {
							const imgSrc: string = canvas.toDataURL('image/jpeg')
							if (imgSrc) {
								imgSrcArr[i] = imgSrc
							}
							if (imgSrcArr.length === pageNum && !isEmptyArray(imgSrcArr)) {
								if (isIntegrate) {
									const canvasWhole = document.createElement("canvas")
									const contextWhole = canvasWhole.getContext('2d')
									canvasWhole.width = viewport.width
									canvasWhole.height = viewport.height * pageNum
									let count = 0
									for (let j = 0; j < pageNum; j++) {
										const imgItem = new Image();
										imgItem.src = imgSrcArr[j];
										imgItem.width = viewport.width;
										imgItem.height = viewport.height;
										imgItem.onload = function () {
											(contextWhole as CanvasRenderingContext2D).drawImage(imgItem, 0, viewport.height * j)
											if (++count == pageNum) {
												resolve(canvasWhole.toDataURL('image/jpeg'))
											}
										}
									}
								} else {
									resolve(imgSrcArr)
								}
							}
						})
					})
				}
			})
		} catch (error) {
			reject(error)
		}
	})
}

export {
	pdfToImg
}



