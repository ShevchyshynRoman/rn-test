const URL = 'https://newsapi.org/v2/everything';
const apiKey = '&apiKey=369a33bbc6114b69b5800a5ac0c2cd7e';
const newApiASD = '&apiKey=fd3bd80f579a47b3812a6cb60f2d89ce';
const pageSize = '&pageSize=5';
const page = '&page=1';

export const getArticlesFromApi = async (search, page) => {
  const response = await fetch(URL+ `?q=restaurant ${search}` + apiKey + `&page=${page}` + pageSize);

  return response.json();
};
