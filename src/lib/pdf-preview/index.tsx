import React, { useState, useEffect } from 'react'
import { PdfPreviewProps, AngleProps } from './types'
import * as pdfjslib from 'pdfjs-dist/build/pdf'
import 'pdfjs-dist/build/pdf.worker.entry'
import PdfCanvas from '../pdf-canvas/index'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import angleRight from '../../media/angleRight.svg'
import angleLeft from '../../media/angleLeft.svg'
import styles from './styles/index.module.css'

const PdfPreview = ({
  url,
  pageNumber,
  getNumPages,
  onChange
}: PdfPreviewProps) => {
  const [numPages, setNumPages] = useState<null | number>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pagesArray, setPagesArray] = useState<number[]>([])

  const arrowIcons = {
    left: angleLeft,
    right: angleRight
  }

  const loadDocument = () => {
    pdfjslib.getDocument(url).promise.then((pdf: any) => {
      setNumPages(pdf.numPages)
      setIsLoading(false)
      setPagesArray(arrayByMaxNum(pdf.numPages))
    })
  }

  const arrayByMaxNum = (maxNum: number) => {
    const numArray = []
    for (let i = 1; i <= maxNum; i++) {
      numArray.push(i)
    }
    return numArray
  }

  const PreviewPages = pagesArray.map((pageNum) => {
    return <PdfCanvas key={pageNum} url={url} pageNumber={pageNum} />
  })

  useEffect(() => {
    loadDocument()
  }, [url])

  useEffect(() => {
    console.log(`pageNumber`, pageNumber)
  }, [pageNumber])

  useEffect(() => {
    if (numPages && getNumPages) {
      getNumPages(numPages)
    }
  }, [numPages])

  useEffect(() => {
    console.log(`isLoading`, isLoading)
  }, [isLoading])

  const Angle = ({ type }: AngleProps) => {
    return <img src={arrowIcons[type]} className={styles[`arrow-${type}`]} />
  }

  const ArrowLeft = Angle({ type: 'left' })
  const ArrowRight = Angle({ type: 'right' })

  return (
    <div>
      <ScrollMenu
        data={PreviewPages}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        scrollBy={1}
        menuClass={styles.menu}
        wrapperClass={styles.menuWrapper}
        itemClass={styles.menuItemWrapper}
        onSelect={(pageNum: any) =>
          onChange ? onChange(parseInt(pageNum)) : null
        }
      />
    </div>
  )
}

export default PdfPreview
