import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';
import { useState, useEffect } from 'react';
import { getArticlesFromApi } from './src/api/api';

import ArticleList from './src/components/articleList';


export default function App() {
  const [articles, setArticles] = useState([]);
  const [inputText, setInputText] = React.useState('');

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreArticles = () => {
    console.log('loadMoreArticles')
    setPage(prev => prev + 1)
  }

  useEffect(() => {
    async function response() {
      setIsLoading(true)
      const dataFromServer = await getArticlesFromApi(page);

      setArticles([...articles, ...dataFromServer.articles]);
      setIsLoading(false)
    }

    async function onTextChange() {
      setIsLoading(true)
      const dataFromServer = await getArticlesFromApi(inputText);

      setArticles(dataFromServer.articles);
      setIsLoading(false)
    }

    onTextChange();
    response();

  }, [inputText, page]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Search by word'
        onChangeText={setInputText}
        value={inputText}
      />

      <ArticleList
        articles={articles}
        isLoading={isLoading}
        loadMoreArticles={loadMoreArticles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingBottom: 120,
    padding: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
