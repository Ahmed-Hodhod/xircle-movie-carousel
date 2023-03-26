import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../data';
import SlideItem from './SlideItem';
import Pagination from './Pagination';
import { DataStore } from 'aws-amplify';

const Slider = () => {

  // const TodoList = () => {
  //   const [todos, setTodos] = useState([]);
  
  //   useEffect(() => {
  
  //     //query the initial todolist and subscribe to data updates
  //     const subscription = DataStore.observeQuery(Todo).subscribe((snapshot) => {
  //       //isSynced can be used to show a loading spinner when the list is being loaded. 
  //       const { items, isSynced } = snapshot;
  //       setTodos(items);
  //     });
  
  //     //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
  //     return function cleanup() {
  //       subscription.unsubscribe();
  //     }
  
  //   }, []);
  
    
  //   async function deleteTodo(todo) {
  //     try {
  //       await DataStore.delete(todo);
  //     } catch (e) {
  //       console.log('Delete failed: $e');
  //     }
  //   }
  //   async function setComplete(updateValue, todo) {
  //     //update the todo item with updateValue
  //     await DataStore.save(
  //       Todo.copyOf(todo, updated => {
  //         updated.isComplete = updateValue
  //       })
  //     );
  //   }
  
  //   const renderItem = ({ item }) => (
  //     <Pressable
  //       onLongPress={() => {
  //         deleteTodo(item);
  //       }}
  //       onPress={() => {
  //         setComplete(!item.isComplete, item);
  //       }}
  //       style={styles.todoContainer}
  //     >
  //       <Text>
  //         <Text style={styles.todoHeading}>{item.name}</Text>
  //         {`\n${item.description}`}
  //       </Text>
  //       <Text
  //         style={[styles.checkbox, item.isComplete && styles.completedCheckbox]}
  //       >
  //         {item.isComplete ? '✓' : ''}
  //       </Text>
  //     </Pressable>
  //   );
  
  //   return (
  //     <FlatList
  //       data={todos}
  //       keyExtractor={({ id }) => id}
  //       renderItem={renderItem}
  //     />
  //   );
  // };

  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

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
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({});
