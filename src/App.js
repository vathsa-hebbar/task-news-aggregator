import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import Preferences from './components/Preferences';
import CookieConsent from 'react-cookie-consent';
import SearchBarWithFilter from './components/SearchBarWithFilter';
import { fetchArticles, mapNewsAPIArticle, mapGuardianArticle, mapNYTArticle } from './components/fetchArticles';

import './styles/custom.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: []
  });

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
          return []; // Return an empty array on error
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
    // Apply preferences to filter articles
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-4 inset-0">
        <div className="flex flex-col md:flex-row items-center justify-between sticky top-[64px] bg-white bg-opacity-50 backdrop-blur-md">
          <SearchBarWithFilter onSearch={handleSearch} onFilter={handleFilter} />
        </div>
        <Preferences onSavePreferences={handleSavePreferences} />
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
