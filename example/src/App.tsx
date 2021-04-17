import React from 'react'
import { PdfContainer } from 'react-files-viewer'

const App = () => {
  return (
    <div style={{height: "100vh", width: "100%"}}>
      <PdfContainer
        url="https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf"
        pageNumber={1} 
      />
    </div>
  )
}

export default App
