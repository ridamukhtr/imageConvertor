import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useThemeManager from '../CustomHooks/useThemeManager';
import RMText from '../Components/RMText';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const History = () => {
  const navigation = useNavigation();
  const {bgColor} = useThemeManager();
  const [data, setData] = useState([]);
  const swipeableRefs = useRef({});
  const prevOpenedRow = useRef(null);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('savedData');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
      console.log('Saved data:', savedData);
    } catch (error) {
      console.error('AsyncStorage Load Error: ', error);
    }
  };

  const deleteItem = async index => {
    try {
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
      await AsyncStorage.setItem('savedData', JSON.stringify(updatedData));

      fnCloseSwipe();
    } catch (error) {
      console.error('AsyncStorage Delete Error: ', error);
    }
  };

  const fnCloseSwipe = index => {
    if (prevOpenedRow.current !== null && prevOpenedRow.current !== index) {
      swipeableRefs.current[prevOpenedRow.current]?.close();
    }
    prevOpenedRow.current = index;
  };

  const renderRightActions = (progress, dragX, index) => {
    return (
      <View
        style={{height: '87%', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteItem(index)}>
          <MaterialCommunityIcons name={'delete'} size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item, index}) => (
    <Swipeable
      ref={ref => (swipeableRefs.current[index] = ref)}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, index)
      }
      onSwipeableOpen={() => fnCloseSwipe(index)}
      overshootLeft={false}
      overshootRight={false}
      friction={1}
      overshootFriction={8}
      rightThreshold={40}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          swipeableRefs.current[index]?.close();
          navigation.navigate('Result', {item});
        }}
        style={styles.content}>
        <View style={styles.textContainer}>
          <Image source={{uri: item?.imageUri}} style={styles.image} />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
            {item.text.split(' ').slice(0, 5).join(' ')}...
          </Text>
        </View>
        <View style={styles.chevron}>
          <Entypo name={'chevron-right'} size={25} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  useEffect(() => {
    return () => {
      if (prevOpenedRow.current !== null) {
        swipeableRefs.current[prevOpenedRow.current]?.close();
      }
    };
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.body}>
        <RMText textStyle={styles.headerText}>History</RMText>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          inverted={true}
        />
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  body: {
    justifyContent: 'space-between',
    width: '95%',
    marginHorizontal: 10,
    marginBottom: 40,
  },
  headerText: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  content: {
    width: '95%',
    marginHorizontal: 10,
    backgroundColor: '#332e2e',
    borderRadius: 10,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  list: {paddingBottom: 20},
  textContainer: {flexDirection: 'row', alignItems: 'center', width: '80%'},
  image: {width: 70, height: 60, resizeMode: 'contain', marginRight: 10},
  text: {fontSize: 16, color: 'white', flexShrink: 1},
  chevron: {width: '20%', alignItems: 'center'},
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '70%',
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
