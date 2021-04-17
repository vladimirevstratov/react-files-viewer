import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef
} from 'react'
import * as pdfjslib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/build/pdf.worker.entry'
import { PdfViewerProps, GetPdfDocumentProps, GetPdfPageProps } from './types'
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'
import styles from './styles/index.module.css'
import print from 'print-js'


let pdfPageView: any

const PdfViewer = (
  {
    url,
    pageNumber = 1,
    getNumPages,
    containerStyle = {},
    viewerStyle = {}
  }: PdfViewerProps,
  ref: any
) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [numPages, setNumPages] = useState<null | number>(null)
  const [activeScale, setActiveScale] = useState(1)
  const [pdfDocument, setPdfDocument] = useState<any>(null)
  const [pdfUrl, setPdfUrl] = useState<null | string>(null)
  const [pdfPage, setPdfPage] = useState<null | any>(null)
  const zoomStep = 0.25

  const getPdfDocument = async ({
    pdfUrl = url,
    callback
  }: GetPdfDocumentProps) => {
    const cMapUrl = '../../../node_modules/pdfjs-dist/cmaps/'
    const loadingTask = pdfjslib.getDocument({
      url: pdfUrl,
      cMapUrl,
      cMapPacked: true
    })

    const res = await loadingTask.promise
    setNumPages(res.numPages)
    res
      .getData()
      .then((data: any) =>
        setPdfUrl(
          URL.createObjectURL(new Blob([data], { type: 'application/pdf' }))
        )
      )

    callback(res)
  }

  const getPdfPage = async ({
    document,
    page = pageNumber,
    callback
  }: GetPdfPageProps) => {
    if (document) {
      const res = await document.getPage(page)
      callback(res)
    }
  }

  const setPdfPageView = ({
    page = pdfPage,
    callback,
    scale = activeScale
  }: any) => {
    if (page) {
      const eventBus = new pdfjsViewer.EventBus()

      pdfPageView = new pdfjsViewer.PDFPageView({
        container: containerRef.current,
        id: pageNumber,
        scale: scale,
        defaultViewport: page.getViewport({ scale: 1 }),
        eventBus,
        // enable text/annotations layers, if needed
        textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory()
      })
      pdfPageView.setPdfPage(page)
      if (callback) {
        callback(pdfPageView)
      }
    }
  }

  useEffect(() => {
    getPdfDocument({
      pdfUrl: url,
      callback: (res: any) => setPdfDocument(res)
    })
  }, [url])

  useEffect(() => {
    if (pdfDocument) {
      getPdfPage({
        document: pdfDocument,
        page: pageNumber,
        callback: (res: any) => setPdfPage(res)
      })
    }
  }, [pdfDocument])

  useEffect(() => {
    if (pdfDocument && pdfPageView) {
      getPdfPage({
        document: pdfDocument,
        page: pageNumber,
        callback: (res: any) => {
          pdfPageView.setPdfPage(res)
          pdfPageView.draw()
        }
      })
    }
  }, [pageNumber])

  useEffect(() => {
    if (pdfPage) {
      setPdfPageView({
        page: pdfPage,
        callback: (viewer: any) => viewer.draw()
      })
    }
  }, [pdfPage])

  useEffect(() => {
    if (pdfPageView) {
      pdfPageView.update(activeScale)
      pdfPageView.draw()
    }
  }, [activeScale])

  useEffect(() => {
    if (numPages && getNumPages) {
      getNumPages(numPages)
    }
  }, [numPages])

  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      setActiveScale(activeScale + zoomStep)
    },
    zoomOut: () => {
      if (!(activeScale <= zoomStep)) {
        setActiveScale(activeScale - zoomStep)
      }
    },
    zoom: (scaleValue: number) => {
      if (scaleValue > 0) {
        setActiveScale(scaleValue)
      }
    },
    zoomReset: () => {
      if (pdfPage && wrapperRef.current) {
        const wrapperHeight = wrapperRef.current.offsetHeight
        const defaultHeight =
          pdfPageView.viewport.height / pdfPageView.scale + 60
        const scaleValue = wrapperHeight / defaultHeight
        setActiveScale(scaleValue)
      }
    },
    print: () => {
      if (pdfUrl) {
        print({printable: url, type:'pdf', showModal:false})
      }
    }
  }))

  return (
    <div className={styles.container} ref={wrapperRef} style={containerStyle}>
      <div
        ref={containerRef}
        className={`pdfViewer ${styles.viewer}`}
        style={viewerStyle}
      />
    </div>
  )
}

export default forwardRef(PdfViewer)
