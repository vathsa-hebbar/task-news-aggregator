# News Aggregator

## Overview

The News Aggregator is a front-end application designed to aggregate news articles from various sources. It provides functionality for searching and filtering articles based on keywords, date, category, and source. Users can customize their news feed by selecting their preferred sources, categories, and authors. The application is mobile-responsive and optimized for a clean, user-friendly experience.

## Features

- **Article Search**: Search for articles by keyword.
- **Filtering**: Filter articles by date, category, and source.
- **Personalized News Feed**: Customize the news feed by selecting preferred sources, categories, and authors.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Docker Integration**: Containerized using Docker for consistent development and deployment.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Flowbite**: Component library for enhanced UI elements.
- **NewsAPI**: API for fetching news articles.
- **Docker**: Containerization platform for running the application.

## Setup and Installation

1. **Clone the Repository**
   - fork and clone the Repository

   ```bash
   git clone https://github.com/your-username/news-aggregator.git
   cd news-aggregator
   ```

## Build and Deployment

**Docker Setup**

   Build and run the Docker container with:

   ```bash
   docker-compose up --build
   ```

   The application will be available at `http://localhost:3000`.

## Folder Structure

- `src/components/`: Contains React components for the application.
- `src/App.js`: The main application component.
- `src/index.js`: The entry point for React.
- `src/tailwind.css`: Tailwind CSS configuration.
- `Dockerfile`: Docker configuration file for building the application container.
- `docker-compose.yml`: Docker Compose configuration for running the application.

## API Integration

- **NewsAPI**: Use the API key from [NewsAPI](https://newsapi.org) to fetch articles.
- **The Guardian**: Use the API key from [The Guardian](https://open-platform.theguardian.com/) to fetch articles.
- **New York Times**: Use the API key from [New York Times](https://developer.nytimes.com/) to fetch articles.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.