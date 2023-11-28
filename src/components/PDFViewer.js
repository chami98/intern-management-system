import React from 'react';

const PDFViewer = ({ match }) => {
  const url = match.params.url;
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe src={url} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default PDFViewer;