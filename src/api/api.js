const URL = 'https://newsapi.org/v2/everything';

const apiKey = '&apiKey=369a33bbc6114b69b5800a5ac0c2cd7e';

export const getArticlesFromApi1 = async (from, to) => {
  const searchQuery = `?q=restaurants`;
  let searchFrom = '';
  let searchTo = '';

  if (from) {
   searchFrom = `&from=${from}`
  }

  if (to) {
    searchTo = `&to=${to}`
  }

 const response = await fetch(URL+ searchQuery + apiKey + searchFrom + searchTo);

 return response.json();
};
