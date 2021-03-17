export interface PdfViewerProps {
  url: string
  pageNumber: number
  getNumPages?: (numPages: number) => void
}

export interface GetPdfDocumentProps {
  pdfUrl: string
  callback: (pdfDoc: any) => void
}

export interface GetPdfPageProps {
  document: any
  page?: number
  callback: (pdfPage: any) => void
}

export interface SetPdfPageView {
  page: any
  callback: (pdfViewer: any) => void
  scale?: number
}
