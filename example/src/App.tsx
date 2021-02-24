import React from 'react'

import { PdfViewer } from 'react-files-viewer'

const App = () => {
  return <PdfViewer 
    url="https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf"
    pageNumber={1}
  />
}

export default App
