import React, { useRef } from 'react'
import PdfViewer from '../pdf-viewer'
import { PdfContainerProps } from './types'
import zoomPlus from '../../media/zoomPlus.svg'
import zoomMinus from '../../media/zoomMinus.svg'
import fullScreen from '../../media/fullscreen.svg'
import styles from './styles/index.module.css'

const PdfContainer = ({ url, pageNumber, getNumPages }: PdfContainerProps) => {
  const ref = useRef<any | null>(null)

  return (
    <div className={styles.container}>
      <div className={styles.zoomBlock}>
        <div
          role='button'
          className={styles.zoomButton}
          onClick={() => ref.current?.zoomReset()}
        >
          <img className={styles.zoomImage} src={fullScreen} />
        </div>
        <div
          role='button'
          className={styles.zoomButton}
          onClick={() => ref.current?.zoomIn()}
        >
          <img className={styles.zoomImage} src={zoomPlus} />
        </div>
        <div
          role='button'
          className={styles.zoomButton}
          onClick={() => ref.current?.zoomOut()}
        >
          <img className={styles.zoomImage} src={zoomMinus} />
        </div>
      </div>
      <PdfViewer
        url={url}
        pageNumber={pageNumber}
        ref={ref}
        getNumPages={getNumPages}
      />
    </div>
  )
}

export default PdfContainer
