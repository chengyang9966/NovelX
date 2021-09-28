import React, { useState } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import sample from './test.pdf';
import Loading from './Loading';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import LeftRightBtn from './leftRightBtn';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(props) {
    console.log("🚀 ~ file: PDFView.js ~ line 12 ~ onDocumentLoadSuccess ~ numPages", props)
    setNumPages(props.numPages);
  }

  return (
    <div style={{display:'flex',alignItems:'center',flexDirection:'column',position:'relative'}}>
      <Document
        file={sample}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<Loading/>}
        className="pdf-container"
      >
        <Page pageNumber={pageNumber} />
        <div className='page-control'>
    <LeftRightBtn text={pageNumber} totalPage={numPages} 
    leftBtn={()=>setPageNumber(prev=>prev-1)}
    rigthBtn={()=>setPageNumber(prev=>prev+1)}
    />
    </div>
      </Document>

    </div>
  );
}

export default MyApp