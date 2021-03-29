# react-files-viewer

> Viewer for differents files (pdf, other)

[![NPM](https://img.shields.io/npm/v/react-files-viewer.svg)](https://www.npmjs.com/package/react-files-viewer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 📦 Install

```bash
npm install --save react-files-viewer
```

## 🔨 General Usage

```tsx
import React from 'react'
import { PdfContainer } from 'react-files-viewer'

const App = () => {
  return (
    <PdfContainer
      // your pdf url
      url="http://www.africau.edu/images/default/sample.pdf"
      // your page number
      pageNumber={1}
    />
  )
}

export default App
```

## PdfContainer
This component provides access to a PDF viewer with control over it (zoom, print, etc.).

```tsx
<PdfContainer
      // your pdf url
      url="http://www.africau.edu/images/default/sample.pdf"
      // your page number
      pageNumber={1}
      // get number of pages
      getNumPages={(numPages) => console.log("numPages", numPages)}
/>
```

## PdfViewer
This component provides access ti a Mozilla PDF viewer with custom setting 

```tsx
<PdfViewer
      // your pdf url
      url="http://www.africau.edu/images/default/sample.pdf"
      // your page number
      pageNumber={1}
      // get number of pages
      getNumPages={(numPages) => console.log("numPages", numPages)}
      // container style
      containerStyle={}
      // viewer style
      viewerStyle={}
/>
```

## License

MIT © [vladimirevstratov](https://github.com/vladimirevstratov)
