import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React from 'react';
import { Storage } from 'aws-amplify';

const {width, height} = Dimensions.get('screen');

const SlideItem = ({item}) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  const bucket = "https://carousel-storage-a9c7473a23809-dev.s3.amazonaws.com/protected/"
  const image = item.image ? item.image: "default.jpeg"
  const ImageSource = bucket.concat(image)
  return (
    <View style={styles.container}>
      <Animated.Image
        source={ImageSource}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />

      <View style={styles.content}>
       <Text style={styles.title}>{item.title}</Text>
      

        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.year}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
