import React from "react";
import Home from "./views/Home";

function App() {

  let appContrast = ['light', 'dark'];
  
  if (localStorage.getItem('color-mode') == null && !appContrast.includes(localStorage.getItem('color-mode'))) {
      localStorage.setItem('color-mode','dark');
  } 

  let appCurrentContrast = localStorage.getItem('color-mode') == 'dark' ? 'black' : 'white';
  document.getElementsByTagName('body')[0].style.backgroundColor = appCurrentContrast;

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
