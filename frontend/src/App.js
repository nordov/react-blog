import './App.css';
import { Routes, Route } from 'react-router-dom';

import {
  HomePage,
  AboutPage,
  ArticlePage,
  ArticlesList,
  NotFoundPage,
} from './pages'

import NavBar from './NavBar';

function App() {
  return (
    <>
      <div className='nav-bar'>
        <NavBar />
      </div>
      <div>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/articles-list" element={ <ArticlesList /> } />
        <Route path="/article/:name" element={ <ArticlePage /> } />
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
      </div>
    </>
  );
}

export default App;
