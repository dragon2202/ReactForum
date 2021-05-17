import React from 'react'
import Navigation from'./components/navigation'
import {BrowserRouter as Router} from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import Pages from './pages/router'

function App() {
  return (
    <Router >
      <div className="App">
        <CookiesProvider>
          <Navigation />
          <Pages />
        </CookiesProvider>
      </div>
    </Router>
  );
}

export default App;

//https://www.youtube.com/watch?v=aI3E8mQa41w
//https://github.com/syntacticsolutions/react-blog

