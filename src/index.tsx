import * as React from 'react'
import styles from './styles.module.css'
import PdfViewer from './lib/pdf-viewer'

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
