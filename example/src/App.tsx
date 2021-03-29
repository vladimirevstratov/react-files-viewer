import React from 'react'
import { PdfContainer } from 'react-files-viewer'

const App = () => {
  return (
    <div style={{height: "100vh", width: "100%"}}>
      <PdfContainer
        url="https://classics.berkeley.edu/sites/default/files/2020-01/sample.pdf"
        pageNumber={1} 
      />
    </div>
  )
}

export default App
