// export default [
//   {
//     id: 1,
//     img: require('../assets/watch7.jpeg'),
//     title: 'Apple Watch Series 7',
//     description: 'The future of health is on your wrist',
//     price: '$399',
//   },
//   {
//     id: 2,
//     img: require('../assets/airpod.jpeg'),
//     title: 'AirPods Pro',
//     description: 'Active noise cancellation for immersive sound',
//     price: '$249',
//   },
//   {
//     id: 3,
//     img: require('../assets/airpodmax.jpeg'),
//     title: 'AirPods Max',
//     description: 'Effortless AirPods experience',
//     price: '$549',
//   },
//   {
//     id: 4,
//     img: require('../assets/charger.png'),
//     title: 'Charger',
//     description: "It's not magic, it's just science",
//     price: '$49',
//   },
//   {
//     id: 5,
//     img: require('../assets/lock.jpeg'),
//     title: 'Smart Lock',
//     description: 'Unlock your door with your phone',
//     price: '$199',
//   },
// ];


import { Movies } from '../models';
import { DataStore } from 'aws-amplify';
import { useEffect } from 'react';



const [movies, setMovieList] = useState([]);

DataStore.observeQuery(Movies).subscribe((snapshot) => {
  //isSynced can be used to show a loading spinner when the list is being loaded. 
  const { items, isSynced } = snapshot;
  setMovieList(items);
  console.log('wlcome')
 
});


export default movies; 