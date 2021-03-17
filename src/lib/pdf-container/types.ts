export interface PdfContainerProps {
  url: string
  getNumPages?: (numPages: number) => void
  pageNumber: number
}
