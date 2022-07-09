import React from 'react';
import { Button, Image, Modal, StyleSheet, Text, View } from 'react-native';


export default function ModalDetails({
  urlToImage,
  title,
  description,
  publishedAt,
  sourceName,
  author,
  modalVisible,
  setModalVisible,
}) {
  return (
    <Modal visible={modalVisible}>
      <View
        style={styles.modalContainer}
      >
        <Text
          style={styles.title}
        >
          {title}
        </Text>

        <Image
          style={styles.img}
          source={{
            uri: `${urlToImage ? urlToImage : '../assets/images/img-not-found.png'}`
          }}
        />

        <Text
          style={styles.description}
        >
          {description}
        </Text>

        <View style={styles.infoBlock}>
          <Text style={styles.publishedAt}>
            <Text style={styles.subtitle}>
              {`Published at: `}
            </Text>
            {publishedAt ? publishedAt : 'not found'}
          </Text>

          <Text style={styles.sourceName}>
            <Text style={styles.subtitle}>
              {'Source name: '}
            </Text>
            {sourceName ? sourceName : 'not found'}
          </Text>

          <Text style={styles.author}>
            <Text style={styles.subtitle}>
              {'Author: '}
            </Text>
            {author ? author : 'not found'}
          </Text>
        </View>

        <Button
          title="return back"
          onPress={() => setModalVisible(false)}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: 'flex',
    alignSelf: 'center',

    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',

    marginBottom: 10,
  },
  img: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  description: {
    fontSize: 15,
    minHeight: 250,

    marginBottom: 10,
  },
  infoBlock: {
    marginBottom: 10,
  },
  publishedAt: {
    marginBottom: 5,
  },
  sourceName: {
    marginBottom: 5,
  },
  author: {
    marginBottom: 5,
  },
  subtitle: {
    fontWeight: 'bold',
  }
});
