import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './Home';
import { MedicamentApp } from './MedicamentApp';
// https://api.fda.gov/other/substance.json?search=names.name:"PARACETAMOL"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)
