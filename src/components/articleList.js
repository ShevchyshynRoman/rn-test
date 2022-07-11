import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import Article from "./article";


export default React.memo(function ArticleList({
  articles,
  loadMoreArticles,
  isLoading
}) {
  const renderLoader = () => {
    return (
      isLoading && (
        <View>
          <ActivityIndicator size='large' color='#aaa' />
        </View>
      )
    )
  }

  return (
    <View>
      <View>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <Article
              urlToImage={item.urlToImage}
              title={item.title}
              description={item.description}
              publishedAt={item.publishedAt}
              sourceName={item.source.name}
              author={item.author}
            />
          )}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreArticles}
          onEndReachedThreshold={0}
        />
      </View>
    </View>
  );
}
)
