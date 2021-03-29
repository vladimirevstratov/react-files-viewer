import { CSSProperties } from 'react'

export interface PdfCanvasProps {
  url: string
  getNumPages?: (numPages: number) => void
  pageNumber: number
  containerStyle?: CSSProperties
  canvasStyle?: CSSProperties
}
