import React, {useCallback} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { useState, useEffect } from 'react';
import { getArticlesFromApi } from './src/api/api';
import debounce from './src/components/helpers/debounce';

import ArticleList from './src/components/articleList';
import DateRangePicker from "rn-select-date-range";
import moment from "moment";


export default function App() {
  const [articles, setArticles] = useState([]);
  const [inputText, setInputText] = React.useState('');

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRange, setRange] = useState({});
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const loadMoreArticles = () => {
    setPage(prev => prev + 1);
    console.log('loadMoreArticles');
  }

  useEffect(() => {
    async function response() {
      try {
        setIsLoading(true);
        const dataFromServer = await getArticlesFromApi(inputText, page);

        console.log('new request');
        console.log(page);

        setArticles([...articles, ...dataFromServer.articles]);
        setIsLoading(false);
      } catch {
        alert('Can not load articles')
      }
    }

    response();
  }, [inputText, page]);

  return (
    <View style={styles.container}>
      {!isOpenCalendar && (
        <View>
          <TextInput
            style={styles.input}
            placeholder='Search by word'
            onChangeText={setInputText}
            value={inputText}
          />
        </View>
      )}

      {!isOpenCalendar && (
        <View style={styles.chooseContainer}>
          <Button
            title='Choose period'
            onPress={() => setIsOpenCalendar(true)}
          />
          {selectedRange.firstDate && (
            <Text>first date: {selectedRange.firstDate}</Text>
          )}
          {selectedRange.secondDate && (
            <Text>second date: {selectedRange.secondDate}</Text>
          )}

        </View>
      )}

      {isOpenCalendar && (
        <View>
          <DateRangePicker
            onSelectDateRange={(range) => {
              setRange(range);
            }}
            blockSingleDateSelection={true}
            responseFormat="YYYY-MM-DD"
            maxDate={moment()}
            minDate={moment().subtract(100, "days")}
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
          />
          <View style={styles.container}>
            <Text>first date: {selectedRange.firstDate}</Text>
            <Text>second date: {selectedRange.secondDate}</Text>
            <Button
              title='Close calendar'
              onPress={() => setIsOpenCalendar(false)}
            />
          </View>
        </View>
      )}

      {!isOpenCalendar && (
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          loadMoreArticles={loadMoreArticles}
        />
      )}
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
  chooseContainer: {
    padding: 5,
    marginBottom: 5
  }
})
