const API_KEY = '94b5706b';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

export const fetchMovies = async (query = 'Marvel') => {
  try {
    const response = await fetch(`${BASE_URL}&s=${query}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error("Помилка АРІ:", error);
    throw error;
  }
};