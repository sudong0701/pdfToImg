export interface pdfToImgParams {
	url: string,
	scale?: number,
	isIntegrate?: boolean 
}

export interface pdfToImgFncConfig {
    (params: pdfToImgParams): Promise<string | Array<string>>
}
