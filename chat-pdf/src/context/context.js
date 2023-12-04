import React from 'react';

export const PdfContext = React.createContext({
  vectordb: '',
  myString: 'xxx',
  updateMyString: () => {},
  updateVectorDatabase: () =>{},
});