export interface PdfCanvasProps {
  url: string
  getNumPages?: (numPages: number) => void
  pageNumber: number
}
