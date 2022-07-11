const URL = 'https://newsapi.org/v2/everything';

const apiKey = '&apiKey=369a33bbc6114b69b5800a5ac0c2cd7e';
const apiKey1 = '&apiKey=fd3bd80f579a47b3812a6cb60f2d89ce';
const apiKey2 = '&apiKey=36a208b6a03045ad91e26d24f37baec4';
const apiKey3 = '&apiKey=32e24ccafe5a456bbe356789aa15f775';
const apiKey4 = '&apiKey=52ec5619e8074eb8a9ed678a55b3e88a';

const pageSize = '&pageSize=5';

export const getArticlesFromApi = async (search, page) => {
  const searchQuery = `?q=restaurant ${search}`

  const response = await fetch(URL+ searchQuery + apiKey + `&page=${page}` + pageSize);

  return response.json();
};
