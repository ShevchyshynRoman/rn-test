const URL = 'https://newsapi.org/v2/everything';

const apiKey = '&apiKey=369a33bbc6114b69b5800a5ac0c2cd7e';
const apiKey1 = '&apiKey=fd3bd80f579a47b3812a6cb60f2d89ce';
const apiKey2 = '&apiKey=36a208b6a03045ad91e26d24f37baec4';
const apiKey3 = '&apiKey=32e24ccafe5a456bbe356789aa15f775';
const apiKey4 = '&apiKey=52ec5619e8074eb8a9ed678a55b3e88a';
const apiKey5 = '&apiKey=fcfde35fcff14df0a33cf513097b11d9';

const pageSize = '&pageSize=5';

/*export const getArticlesFromApi = async (inputText, page, firstDate = '', secondDate = '') => {
  const searchQuery = `?q=restaurant ${inputText}`;
  const currentPage = `&page=${page}`;
  const searchFrom = `&from=${firstDate}`
  const searchTo = `&to=${secondDate}`

  console.log(searchFrom)
  console.log(searchTo)
  console.log(inputText)

  const response = await fetch(URL+ searchQuery + apiKey5 + currentPage + searchFrom + searchTo + pageSize);

  return response.json();
};*/

/*export const getArticlesFromApi1 = async () => {
  const searchQuery = `?q=restaurant`;

  const response = await fetch(URL+ searchQuery + apiKey5);

  return response.json();
};*/

export const getArticlesFromApi1 = async (from, to) => {
  const searchQuery = `?q=restaurant`;
  let searchFrom = '';
  let searchTo = '';

  if (from) {
   searchFrom = `&from=${from}`
  }

  if (to) {
    searchTo = `&to=${to}`
  }

 const response = await fetch(URL+ searchQuery + apiKey4 + searchFrom + searchTo);

 return response.json();
};
