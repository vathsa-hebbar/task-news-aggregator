import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import Preferences from './components/Preferences';
import CookieConsent from 'react-cookie-consent';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import { fetchArticles, mapNewsAPIArticle, mapGuardianArticle, mapNYTArticle } from './components/fetchArticles';

import './styles/custom.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: []
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchAllArticles = async (keyword = 'latest') => {
    try {
      const sources = [
        { name: 'newsapi', mapFunction: mapNewsAPIArticle },
        { name: 'guardian', mapFunction: mapGuardianArticle },
        { name: 'nyt', mapFunction: mapNYTArticle }
      ];

      const fetchPromises = sources.map(async ({ name, mapFunction }) => {
        try {
          return await fetchArticles(name, keyword, mapFunction);
        } catch (error) {
          console.error(`Failed to fetch articles from ${name}`, error);
          return [];
        }
      });

      const results = await Promise.all(fetchPromises);
      const allArticles = results.flat();
      
      setArticles(allArticles);
      setFilteredArticles(allArticles);
    } catch (error) {
      console.error('Failed to fetch articles', error);
    }
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  const handleSearch = async (keyword) => {
    fetchAllArticles(keyword);
  };

  const handleFilter = (type, value) => {
    let filtered;

    if (type === 'publishedAt') {
      filtered = articles.sort((a, b) => new Date(value === 'latest' ? b.publishedAt : a.publishedAt) - new Date(value === 'latest' ? a.publishedAt : b.publishedAt));
    } else {
      filtered = articles.filter(article => article[type]?.toLowerCase().includes(value.toLowerCase()));
    }

    setFilteredArticles(filtered);
  };

  const handleSavePreferences = (prefs) => {
    setPreferences(prefs);
    applyPreferences(prefs);
  };

  const applyPreferences = (prefs) => {
    let filtered = articles;

    if (prefs.sources.length) {
      filtered = filtered.filter(article => prefs.sources.includes(article.source));
    }
    if (prefs.categories.length) {
      filtered = filtered.filter(article => prefs.categories.includes(article.category));
    }
    if (prefs.authors.length) {
      filtered = filtered.filter(article => prefs.authors.includes(article.author));
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-4 inset-0">
        <div className="flex flex-col md:flex-row items-center justify-between sticky top-[64px] bg-white bg-opacity-50 backdrop-blur-md">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className='relative'>
          <div className={`hidden md:flex ${isScrolled ? 'fixed right-0 top-[165px] justify-end items-start' : 'top-[200px] justify-center'} transition-all duration-300 mt-4 p-4 gap-4 z-50`}>
            <Preferences onSavePreferences={handleSavePreferences} />
            <Filter onFilter={handleFilter} />
          </div>
          <div className='fixed bottom-16 right-0 p-4 flex flex-col justify-end md:justify-center gap-4 items-start md:hidden'>
            <Preferences onSavePreferences={handleSavePreferences} />
            <Filter onFilter={handleFilter} />
          </div>
        </div>

        <ArticleList articles={filteredArticles} />
      </main>
      <Footer />
      <CookieConsent
        buttonText="Accept"
        cookieName="userAcceptedCookies"
        style={{ background: '#f6f9fc', color: '#003366'}}
        buttonStyle={{background: '#003366', color: '#f6f9fc', fontSize: '13px', borderRadius: '5px'}}
        expires={365}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
};

export default App;
