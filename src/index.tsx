import * as React from 'react'
import styles from './styles.css'
import PdfViewer from './lib/pdf-viewer'
import PdfContainer from './lib/pdf-container'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return (
    <div>
      <div className={styles.test}>Example Component: {text}</div>
    </div>
  )
}

export { PdfViewer }
export { PdfContainer }
