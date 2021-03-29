import React, { useState } from 'react'
import { PdfPreview, PdfContainer } from 'react-files-viewer'

const App = () => {
  const [pageNum, setPageNum] = useState(1)

  return (
    <div>
      <PdfPreview 
        url="https://classics.berkeley.edu/sites/default/files/2020-01/sample.pdf"
        pageNumber={pageNum} 
        onChange={(num) => {
          console.log(`num`, num)
          setPageNum(num)}}
      />
      <PdfContainer
        url="https://classics.berkeley.edu/sites/default/files/2020-01/sample.pdf"
        pageNumber={pageNum} 
      />
    </div>
  )
}

export default App
