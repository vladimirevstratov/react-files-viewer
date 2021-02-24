import React, { useRef } from 'react'
import * as pdfjslib from 'pdfjs-dist'
import { PdfViewerProps } from './types'

const PdfViewer = ({
  url,
  pageNumber = 1
}: // width,
// height
PdfViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const loadDocument = () => {
    pdfjslib.GlobalWorkerOptions.workerSrc =
      '//cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/build/pdf.worker.js'
    pdfjslib.getDocument(url).promise.then((pdf: any) => {
      pdf.getPage(pageNumber).then((page: any) => {
        const scale = 1
        const unscaledViewport = page.getViewport({ scale })
        const canvas = canvasRef.current
        if (canvas) {
          canvas.style.width = '100%'
          canvas.width = canvas.offsetWidth
          const viewport = page.getViewport({
            scale: canvas.width / unscaledViewport.width
          })

          canvas.style.height = '100%'
          canvas.height = viewport.height

          const context = canvas.getContext('2d')
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          const renderTask = page.render(renderContext)
          renderTask.promise.then(() => {
            console.log('Page rendered')
          })
        }
      })
    })
  }
  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <canvas ref={canvasRef} />
      {loadDocument()}
    </div>
  )
}

export default PdfViewer
