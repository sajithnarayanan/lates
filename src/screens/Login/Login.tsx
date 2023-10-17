import React, { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Homestack';
import colors from '../../config/Colors';
import styles from './Login.styles';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDetailsObject } from '../SignUp/SignUp';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type LoginRouteProp = RouteProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
}

export const getUserDetails = async () => {
  try {
    const storedArray = await AsyncStorage.getItem('userDetails');
    if (storedArray) {
      const parsedArray = JSON.parse(storedArray);
      return parsedArray;
    }
  } catch (error) {
    console.error('Error fetching UserDetailsArray from AsyncStorage:', error);
  }
  return [];
};

const GetAdminDetails = async () => {
  try {
    const storedArray = await AsyncStorage.getItem('AdminDetails');
    if (storedArray) {
      const parsedArray = JSON.parse(storedArray);
      return parsedArray;
    }
  } catch (error) {
    console.error('Error fetching UserDetailsArray from AsyncStorage:', error);
  }
  return [];
};

const Login: FC<LoginScreenProps> = ({ navigation, route }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
    UserDetailsObject[]
  >([]);

  useEffect(() => {
    getUserDetails().then(parsedArray => {
      setUserDetailsArrayState(parsedArray);
    });
  });

  const SaveAdminDetails = async () => {
    const AdminDetails = {
      username: 'admin',
      password: 'admin123',
    };
    await AsyncStorage.setItem('AdminDetails', JSON.stringify(AdminDetails));
  };

  useEffect(() => {
    GetAdminDetails().then(parsedAdminDetails => {
      if (!parsedAdminDetails.username) {
        SaveAdminDetails();
      }
    });
  }, []);

  const onPressLogin = () => {
    let findedUser = UserDetailsArrayState.find(
      item => item.username === username,
    );

    if (findedUser && findedUser.password === password) {
      AsyncStorage.setItem('currentUserDetails', JSON.stringify(findedUser));
      navigation.navigate('Home', findedUser);
    } else if (username === 'admin' && password === 'admin123') {
      navigation.navigate('Admin');
    } else {
      Alert.alert('Username or password does not match ! Try again !');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://www.shutterstock.com/image-vector/application-on-mobile-smartphone-icons-260nw-1908968959.jpg' }} style={{ justifyContent: 'center', height: 200, width: 300 ,borderRadius:10}} />
      <View style={styles.input}>
        <TextInput
          placeholder="username"
          placeholderTextColor={'black'}
          onChangeText={t => setUserName(t)}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          onChangeText={t => setPassword(t)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressLogin}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.register}
        onPress={() => navigation.navigate('SignUp')}>
        <Text
          style={styles.submit}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
