import React, { useRef, useState, useEffect } from 'react'
import { PdfCanvasProps } from './types'
import * as pdfjslib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/build/pdf.worker.entry'
import styles from './styles/index.module.css'

const PdfCanvas = ({
  url,
  pageNumber,
  getNumPages,
  containerStyle = {},
  canvasStyle = {}
}: PdfCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [numPages, setNumPages] = useState<null | number>(null)

  const loadDocument = () => {
    pdfjslib.getDocument(url).promise.then((pdf: any) => {
      setNumPages(pdf.numPages)
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

  useEffect(() => {
    loadDocument()
  }, [pageNumber])

  useEffect(() => {
    if (numPages && getNumPages) {
      getNumPages(numPages)
    }
  }, [numPages])

  return (
    <div className={styles.container} style={containerStyle}>
      <canvas ref={canvasRef} className={styles.canvas} style={canvasStyle} />
    </div>
  )
}

export default PdfCanvas
