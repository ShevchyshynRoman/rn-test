import React, { useState } from 'react';
import {Button, Image, Modal, StyleSheet, Text, View} from 'react-native';
import ModalDetails from "./modal";


export default React.memo(function Article({
  urlToImage,
  title,
  description,
  publishedAt,
  sourceName,
  author,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.articleContainer}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <Button
        title='Show details'
        onPress={() => setModalVisible(true)}
      />

      <ModalDetails
        urlToImage={urlToImage}
        title={title}
        description={description}
        publishedAt={publishedAt}
        sourceName={sourceName}
        author={author}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
})

const styles = StyleSheet.create({
  articleContainer: {
    borderWidth: 2,
    borderColor: '#454d66',

    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',

    marginBottom: 10,
  },
  description: {
    fontSize: 15,

    marginBottom: 10,
  }
});
