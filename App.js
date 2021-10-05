import './App.css';
import { useState, useEffect } from 'react';
import AutoComplete from './AutoComplete';
import './AutoComplete-Styles.css'
import ProductList from './components/ProductList';


export default function App(){
  return (
    <div class='container'>
      <h1>React Autocomplete Demo</h1>
      <h2>Start typing and experience React autocomplete!</h2>
     <ProductList/>
    </div>
  );

}

