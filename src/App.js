import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import Preferences from './components/Preferences';
import CookieConsent from 'react-cookie-consent';

const API_KEYS = {
  newsapi: process.env.REACT_APP_NEWSAPI_KEY,
  guardian: process.env.REACT_APP_GUARDIAN_KEY,
  nyt: process.env.REACT_APP_NYT_KEY,
};

const fetchArticlesFromNewsAPI = async (keyword) => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEYS.newsapi}`);
  const data = await response.json();
  return data.articles.map(article => ({
    id: article.url,
    title: article.title || 'No Title',
    description: article.description || 'No Description',
    url: article.url,
    source: article.source.name || 'Unknown Source',
    category: article.category || 'General',
    publishedAt: article.publishedAt
  }));
};

const fetchArticlesFromGuardian = async (keyword) => {
  const response = await fetch(`https://content.guardianapis.com/search?q=${keyword}&api-key=${API_KEYS.guardian}&show-fields=trailText`);
  const data = await response.json();
  return data.response.results.map(article => ({
    id: article.id,
    title: article.webTitle || 'No Title',
    description: article.fields?.trailText || 'No Description',
    url: article.webUrl,
    source: 'The Guardian',
    category: article.sectionName || 'General',
    publishedAt: article.webPublicationDate
  }));
};

const fetchArticlesFromNYT = async (keyword) => {
  const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEYS.nyt}`);
  const data = await response.json();
  return data.response.docs.map(article => ({
    id: article._id,
    title: article.headline.main || 'No Title',
    description: article.abstract || 'No Description',
    url: article.web_url,
    source: 'New York Times',
    category: article.section_name || 'General',
    publishedAt: article.pub_date
  }));
};

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: []
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const keyword = 'latest';
        const newsapiArticles = await fetchArticlesFromNewsAPI(keyword);
        const guardianArticles = await fetchArticlesFromGuardian(keyword);
        const nytArticles = await fetchArticlesFromNYT(keyword);

        const allArticles = [...newsapiArticles, ...guardianArticles, ...nytArticles];
        setArticles(allArticles);
        setFilteredArticles(allArticles);
      } catch (error) {
        console.error('Failed to fetch articles', error);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = async (keyword) => {
    const newsapiArticles = await fetchArticlesFromNewsAPI(keyword);
    const guardianArticles = await fetchArticlesFromGuardian(keyword);
    const nytArticles = await fetchArticlesFromNYT(keyword);

    const allArticles = [...newsapiArticles, ...guardianArticles, ...nytArticles];
    setFilteredArticles(allArticles);
  };

  const handleFilter = (type, value) => {
    let filtered;

    if (type === 'publishedAt') {
      if (value === 'latest') {
        filtered = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      } else if (value === 'oldest') {
        filtered = [...articles].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
      } else {
        filtered = articles;
      }
    } else {
      filtered = articles.filter(article => {
        if (!article[type]) return false;
        return article[type].toLowerCase().includes(value.toLowerCase());
      });
    }

    setFilteredArticles(filtered);
  };

  const handleSavePreferences = (prefs) => {
    setPreferences(prefs);
    // Apply preferences to filter articles
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      <main className="flex-grow p-4">
        <Preferences onSavePreferences={handleSavePreferences} />
        <ArticleList articles={filteredArticles} />
      </main>
      <Footer />
      <CookieConsent
        buttonText="Accept"
        cookieName="userAcceptedCookies"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={365}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
};

export default App;
