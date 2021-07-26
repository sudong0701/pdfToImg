export interface pdfToImgParams {
	url: string,
	scale: number,
	isIntegrate: boolean 
}

export interface pdfToImgFncConfig {
    (params: pdfToImgParams): Promise<string | Array<string>>
}

export function pdfToImg(pdfToImgParams: pdfToImgParams):pdfToImgFncConfig