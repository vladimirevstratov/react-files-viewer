export interface PdfViewerProps {
  url: string
  pageNumber: number
  getNumPages?: (numPages: number) => void
}
