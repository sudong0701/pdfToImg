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
    url: string,   //pdf的地址 
    scale: number,   //放大倍数
    isIntegrate: boolean   //是否整合为一张图片
  })
  ```
  
 * 注意:
 前端构建工具为vite下不支持，会报错。请使用pdftoimg-vite(在开发，未发布)

