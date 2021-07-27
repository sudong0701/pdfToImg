# pdfToImg
PDF转图片基于pdfjs

### 使用方式

#### 在项目根目录下执行

 ```bash
  cnpm i pdftoimg-dist -D
  ```



#### 在页面中添加以下代码

 ```bash
  import { pdfToImg } from 'pdftoimg-dist'
  
  pdfToImg({
    url: string,   //pdf的地址(必填)
    scale: number,   //放大倍数(非必填 默认为1)
    isIntegrate: boolean   //是否整合为一张图片 (非必填 默认为false 即不整合为一张图片)
  })
  ```
  
 * 注意:
 前端构建工具为vite下不支持。请使用[pdftoimg-vite](https://github.com/sudong0701/pdfToImg-vite)

