import React from 'react';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <div key={`${article.url}-${index}`} className="border p-4 rounded-lg">
          <h2 className="font-bold">{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
