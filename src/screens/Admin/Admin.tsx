import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Homestack';
import styles from './Admin.styes';
import colors from '../../config/Colors';
import { UserDetailsObject } from '../SignUp/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserDetails } from '../Login/Login';
import { TouchableOpacity } from 'react-native-gesture-handler';

type AdminNavigationProp = StackNavigationProp<RootStackParamList, 'Admin'>;

type AdminRouteProp = RouteProp<RootStackParamList, 'Admin'>;

interface AdminScreenProps {
  navigation: AdminNavigationProp;
  route: AdminRouteProp;
}

const Admin: FC<AdminScreenProps> = ({ navigation, route }) => {
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
    UserDetailsObject[]
  >([]);

  useEffect(() => {
    getUserDetails().then(parsedObject => {
      setUserDetailsArrayState(parsedObject);
    });
  }, []);

  const DeleteItemAsync = async (filteredArray: UserDetailsObject[]) => {
    await AsyncStorage.setItem('userDetails', JSON.stringify(filteredArray));
  };

  const OnDelete = (userName: string) => {
    let filteredArray = UserDetailsArrayState.filter(
      item => item.username !== userName,
    );
    setUserDetailsArrayState(filteredArray);
    DeleteItemAsync(filteredArray);
  };
  return (
    <View style={styles.container}>
      {UserDetailsArrayState.length > 0 ? (
        <View>
          {UserDetailsArrayState.map(item => {
            return (
              <View key={item.username} style={styles.content}>
                <View style={styles.view}>
                  <Text style={styles.userNameFont}>{item.username}</Text>
                  <Text style={styles.mobileNumberFont}>
                    {' '}
                    {item.mobileNumber}
                  </Text>
                </View>
                <View style={styles.view}>
                  <Text style={styles.emailIdFont}> {item.email}</Text>
                  <Text style={styles.dobFont}> {item.dob}</Text>
                </View>

                <TouchableOpacity
                  key={item.username}
                  onPress={() => OnDelete(item.username)}
                  style={styles.imageContainer}>
                  <Image
                    source={require('../../assets/images/delete.png')}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={styles.noContainer}>
          <Text style={styles.nullText}>
            No registered users to display!!!
          </Text>
        </View>
      )}
    </View>
  );
};

export default Admin;
