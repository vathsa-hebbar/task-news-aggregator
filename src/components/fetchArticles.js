// fetchArticles.js
export const API_KEYS = {
    newsapi: process.env.REACT_APP_NEWSAPI_KEY,
    guardian: process.env.REACT_APP_GUARDIAN_KEY,
    nyt: process.env.REACT_APP_NYT_KEY,
  };
  
  export const buildApiUrl = (source, keyword) => {
    switch (source) {
      case 'newsapi':
        return `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEYS.newsapi}`;
      case 'guardian':
        return `https://content.guardianapis.com/search?q=${keyword}&api-key=${API_KEYS.guardian}&show-fields=trailText`;
      case 'nyt':
        return `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEYS.nyt}`;
      default:
        throw new Error('Unknown source');
    }
  };
  
  export const fetchArticles = async (source, keyword, mapArticle) => {
    const url = buildApiUrl(source, keyword);
    const response = await fetch(url);
    const data = await response.json();
    return mapArticle(data);
  };
  
  export const mapNewsAPIArticle = (data) => data.articles.map(article => ({
    id: article.url,
    title: article.title || 'No Title',
    description: article.description || 'No Description',
    url: article.url,
    source: article.source.name || 'Unknown Source',
    category: article.category || 'General',
    publishedAt: article.publishedAt
  }));
  
  export const mapGuardianArticle = (data) => data.response.results.map(article => ({
    id: article.id,
    title: article.webTitle || 'No Title',
    description: article.fields?.trailText || 'No Description',
    url: article.webUrl,
    source: 'The Guardian',
    category: article.sectionName || 'General',
    publishedAt: article.webPublicationDate
  }));
  
  export const mapNYTArticle = (data) => data.response.docs.map(article => ({
    id: article._id,
    title: article.headline.main || 'No Title',
    description: article.abstract || 'No Description',
    url: article.web_url,
    source: 'New York Times',
    category: article.section_name || 'General',
    publishedAt: article.pub_date
  }));
  