import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Homestack';
import styles from './Home.styes';
import { UserDetailsObject } from '../SignUp/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import useActive from '../../hooks/useActive';

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeNavigationProp;
  route: HomeRouteProp;
}

const Home: FC<HomeScreenProps> = ({ navigation, route }) => {
  const UserDetailsObject = route.params;
  const [isChanged, setIsChanged] = useState(false);
  const [username, setUserName] = useState<string>(UserDetailsObject.username);
  const [password, setPassword] = useState<string>(UserDetailsObject.password);
  const [emailId, setEmailId] = useState<string>(UserDetailsObject.email);
  const [dob, setDob] = useState<string>(UserDetailsObject.dob);
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
    UserDetailsObject[]
  >([]);
  const [mobileNumber, setMobileNumber] = useState<string>(
    UserDetailsObject.mobileNumber,
  );

  const SaveUserDetails = async () => {
    let NewObj: UserDetailsObject = {
      username,
      password,
      email: emailId,
      dob,
      mobileNumber,
    };
    let filteredArray = UserDetailsArrayState.filter(
      item => item.username !== UserDetailsObject.username,
    );

    let newArray = [...filteredArray, NewObj];

    AsyncStorage.setItem('userDetails', JSON.stringify(newArray));
  };
  let isActive = useActive([username, password, emailId, dob, mobileNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Username</Text>
      <View style={styles.input}>
        <TextInput
          defaultValue={UserDetailsObject.username}
          onChangeText={t => {
            setIsChanged(true);
            setUserName(t);
          }}
        />
      </View>
      <Text style={styles.text1}>Password</Text>
      <View style={styles.input}>
        <TextInput
          defaultValue={UserDetailsObject.password}
          onChangeText={t => {
            setIsChanged(true);
            setPassword(t);
          }}
        />
      </View>
      <Text style={styles.text2}>Email</Text>
      <View style={styles.input}>
        <TextInput
          defaultValue={UserDetailsObject.email}
          onChangeText={t => {
            setIsChanged(true);
            setEmailId(t);
          }}
        />
      </View>
      <Text style={styles.text2}>DOB</Text>
      <View style={styles.input}>
        <TextInput
          defaultValue={UserDetailsObject.dob}
          maxLength={10}
          keyboardType="number-pad"
          onChangeText={t => {
            setIsChanged(true);
            setDob(t);
          }}
        />
      </View>
      <Text style={styles.text}>Mobile Number</Text>
      <View style={styles.input}>
        <TextInput
          defaultValue={UserDetailsObject.mobileNumber}
          maxLength={10}
          keyboardType="number-pad"
          onChangeText={t => {
            setIsChanged(true);
            setMobileNumber(t);
          }}
        />
      </View>

      <TouchableOpacity disabled={!isChanged} onPress={SaveUserDetails} style={
        isActive
          ? styles.button
          : { ...styles.button, ...styles.buttondisabled }
      }>
        <Text>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
