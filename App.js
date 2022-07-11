import React, {useCallback} from 'react';
import { StyleSheet, TextInput, View} from 'react-native';
import { useState, useEffect } from 'react';
import { getArticlesFromApi } from './src/api/api';
import debounce from './src/components/helpers/debounce';

import ArticleList from './src/components/articleList';


export default React.memo(function App() {
  const [articles, setArticles] = useState([]);
  const [inputText, setInputText] = React.useState('');

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreArticles = () => {
    setPage(prev => prev + 1);
    console.log('loadMoreArticles');
  }

  useEffect(() => {
    async function response() {
      setIsLoading(true);
      const dataFromServer = await getArticlesFromApi(inputText, page);

      console.log('new request');
      console.log(page);

      setArticles([...articles, ...dataFromServer.articles]);
      setIsLoading(false);
    }

    response();
  }, [inputText, page]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Search by word'
          onChangeText={setInputText}
          value={inputText}
        />
      </View>

      <ArticleList
        articles={articles}
        isLoading={isLoading}
        loadMoreArticles={loadMoreArticles}
      />
    </View>
  );
})


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
})
