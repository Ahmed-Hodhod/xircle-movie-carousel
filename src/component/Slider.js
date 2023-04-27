import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import SlideItem from './SlideItem';
import { Movies } from '../models';
import { DataStore, Storage } from 'aws-amplify';



const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [movies, setMovies] = useState([]);

  useEffect( async () => {
   // await DataStore.clear(); 

  //   await DataStore.save(
  //     new Movies({
  //     "title": "title",
  //     "description": "description",
  //     "year": 2022
  //   })
  // );
    const subscription =   DataStore.observeQuery(Movies).subscribe((snapshot) => {
      const { items, isSynced } = snapshot;
      setMovies(items);
    
    });

    return function cleanup() {
      subscription.unsubscribe();
    }

  }, []);



  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={movies}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
 
     


    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
