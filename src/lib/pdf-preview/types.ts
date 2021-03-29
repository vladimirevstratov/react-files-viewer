export interface PdfPreviewProps {
  url: string
  pageNumber: number
  getNumPages?: (numPages: number) => void
  onChange?: (pageNumber: number) => void
}

export interface AngleProps {
  type: 'left' | 'right'
}
