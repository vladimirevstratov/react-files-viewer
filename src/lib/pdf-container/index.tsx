import React, { useRef } from 'react'
import { PdfViewer } from '../..'
import { PdfContainerProps } from './types'
import zoomPlus from '../../media/zoomPlus.png'
import zoomMinus from '../../media/zoomMinus.png'
import fullScreen from '../../media/fullscreen.png'
import styles from './styles/index.module.css'

const PdfContainer = ({ url, pageNumber, getNumPages }: PdfContainerProps) => {
  const ref = useRef<any | null>(null)

  return (
    <div>
      <div className={styles.zoomBlock}>
        <button
          className={styles.zoomButton}
          onClick={() => ref.current?.zoomReset()}
        >
          <img className={styles.zoomImage} src={fullScreen} />
        </button>
        <button
          className={styles.zoomButton}
          onClick={() => ref.current?.zoomIn()}
        >
          <img className={styles.zoomImage} src={zoomPlus} />
        </button>
        <button
          className={styles.zoomButton}
          onClick={() => ref.current?.zoomOut()}
        >
          <img className={styles.zoomImage} src={zoomMinus} />
        </button>
        <button
          className={styles.zoomButton}
          onClick={() => ref.current?.print()}
        >
          <img className={styles.zoomImage} src={zoomMinus} />
        </button>
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
