import React, {
  useState,
  useEffect
} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import { getArticlesFromApi1 } from './src/api/api';
import moment from 'moment';
import DateRangePicker from 'rn-select-date-range';
import SelectDropdown from 'react-native-select-dropdown';
import ArticleList from './src/components/articleList';

export default function App() {
  const [sortByValue, setSortByValue] = useState('publishedAt');
  const selectSortBy = ['publishedAt', 'popularity', 'relevancy'];

  const [articlesFromServer, setArticlesFromServer] = useState([]);
  const [inputText, setInputText] = React.useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [selectedRange, setRange] = useState({});
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  useEffect(() => {
    async function response() {
      try {
        setIsLoading(true);
        const dataFromServer = await getArticlesFromApi1(
          selectedRange.firstDate,
          selectedRange.secondDate,
          sortByValue
        );

        setArticlesFromServer([...dataFromServer.articles]);

        setIsLoading(false);
      } catch {
        alert('Can not load articles')
      }
    }

    response();
  }, [
    selectedRange.firstDate,
    selectedRange.secondDate,
    sortByValue
  ]);

  const filteredFromInputArticles = articlesFromServer.filter(article => (
    (article.title && article.title.toLowerCase().includes(inputText.toLowerCase()))
    || (article.description && article.description.toLowerCase().includes(inputText.toLowerCase()))
  ))

  const [page, setPage] = useState(1);
  const articlesPerPage = 10;
  const totalArticlesCount = filteredFromInputArticles.length;
  const pages = Math.ceil(totalArticlesCount / articlesPerPage);

  const loadMoreArticles = () => {
    setPage(prevPage => {
      setIsLoading(true);
      if (page >= pages) {
        return pages;
      }
      return prevPage + 1;
    });
    setIsLoading(false);
  }

  const startIndex = 0;
  const endIndex = page * articlesPerPage;
  const slicedForPagination = filteredFromInputArticles.slice(startIndex, endIndex);
  const showArticles = [...slicedForPagination];

  console.log(sortByValue)

  return (
    <View style={styles.container}>
    <View>
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
        </View>
      )}

      {isOpenCalendar && (
        <View>
          <DateRangePicker
            onSelectDateRange={(range) => {
              setRange(range);
            }}
            blockSingleDateSelection={false}
            responseFormat="YYYY-MM-DD"
            maxDate={moment()}
            minDate={moment().subtract(100, "days")}
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
          />
          <View style={styles.container}>
            <Button
              title='Close calendar'
              onPress={() => setIsOpenCalendar(false)}
            />
          </View>
        </View>
      )}

    <View style={styles.sortByContainer}>
      <Text style={styles.sortByContainerTitle}>
        Sort by:
      </Text>
      <SelectDropdown
        data={selectSortBy}
        onSelect={(selectedItem) => {
          setSortByValue(selectedItem)
        }}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem
        }}
        rowTextForSelection={(item) => {
          return item
        }}
      />
    </View>

    </View>
      {(!isOpenCalendar && articlesFromServer.length > 0) && (
         <ArticleList
            articles={showArticles}
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
    paddingBottom: 350,
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
  },
  sortByContainer: {
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  sortByContainerTitle: {
    fontSize: 20,
    marginRight: 20
  }
})
