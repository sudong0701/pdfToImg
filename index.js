function pdfToImg({ url, scale = 1, isWhole = false }) {
	return new Promise((resolve, reject) => {
		try {
			pdfjsLib.workerSrc = 'pdf.worker.js';
			const loadingTask = pdfjsLib.getDocument(url)
			loadingTask.promise.then((pdf) => {
				const pageNum = pdf.numPages, imgSrcArr = []
				for (let i = 0; i < pageNum; i++) {
					pdf.getPage(i + 1).then((page) => {
						const viewport = page.getViewport(scale)
						viewport.width = viewport.width ? viewport.width : (viewport.viewBox[2] ? viewport.viewBox[2] : 595.3) * scale
						viewport.height = viewport.height ? viewport.height : (viewport.viewBox[3] ? viewport.viewBox[3] : 841.9) * scale
						const canvas = document.createElement("canvas")
						const context = canvas.getContext('2d')
						canvas.width = viewport.width
						canvas.height = viewport.height
						//根据X轴翻转
						const y = viewport.height / 2
						context.translate(0, y)
						context.scale(scale, -scale)
						context.translate(0, -y / scale)
						console.log(viewport)
						const renderContext = {
							canvasContext: context,
							viewport: viewport
						}
						const renderTask = page.render(renderContext)
						renderTask.promise.then(() => {
							const imgSrc = canvas.toDataURL('image/jpeg')
							if (imgSrc) {
								imgSrcArr[i] = imgSrc
							}
							if (imgSrcArr.length === pageNum) {
								if (isWhole) {
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
											contextWhole.drawImage(imgItem, 0, viewport.height * j)
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