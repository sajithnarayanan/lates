import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputAndroidProps,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/Homestack';
import styles from './SignUp.styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../Login/Login';
import useValidation from '../../hooks/useValidation';
import useActive from '../../hooks/useActive';

type SignUpNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type SignUpRouteProp = RouteProp<RootStackParamList, 'SignUp'>;

interface SignUpScreenProps {
  navigation: SignUpNavigationProp;
  route: SignUpRouteProp;
}

export type UserDetailsObject = {
  username: string;
  password: string;
  dob: string;
  email: string;
  mobileNumber: string;
};

const SignUp: FC<SignUpScreenProps> = ({navigation, route}) => {
  const [UserDetailsArrayState, setUserDetailsArrayState] = useState<
    UserDetailsObject[]
  >([]);
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailId, setEmailId] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const {validateField} = useValidation();

  useEffect(() => {
    getUserDetails().then(parsedArray => {
      setUserDetailsArrayState(parsedArray);
    });
  }, []);

  const SaveUserDetails = async () => {
    let NewObj: UserDetailsObject = {
      username,
      password,
      email: emailId,
      dob,
      mobileNumber,
    };
    if (UserDetailsArrayState.length > 0) {
      let isUserNameExists = UserDetailsArrayState.some(
        item => item.username === username,
      );
      if (isUserNameExists) {
        Alert.alert('The UserName entered is already exists');
      } else {
        let newArray = [...UserDetailsArrayState, NewObj];
        Alert.alert('Signup Succesfully Completed');
        navigation.replace('Login');
        AsyncStorage.setItem('userDetails', JSON.stringify(newArray));
      }
    } else {
      let newArray = [NewObj];
      Alert.alert('Succesfully registered!!');
      navigation.replace('Login');
      AsyncStorage.setItem('userDetails', JSON.stringify(newArray));
    }
  };

  let isActive = useActive([username, password, emailId, dob, mobileNumber]);

  return (
    <View style={styles.container}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text style={styles.text1}>Username</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="username"
            placeholderTextColor={'grey'}
            onChangeText={t => setUserName(t)}
            style={{paddingHorizontal: 5}}
          />
        </View>
        <Text style={styles.text1}>Password</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="password"
            placeholderTextColor={'grey'}
            onChangeText={t => setPassword(t)}
            style={{paddingHorizontal: 5}}
          />
        </View>
        <Text style={styles.text2}>DOB</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="dob"
            placeholderTextColor={'grey'}
            onChangeText={t => setDob(t)}
            style={{paddingHorizontal: 5}}
          />
        </View>
        <Text style={styles.text2}>Email</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="email"
            placeholderTextColor={'grey'}
            onChangeText={t => setEmailId(t)}
            style={{paddingHorizontal: 5}}
          />
        </View>
        <Text style={styles.text}>Mobile Number</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor={'grey'}
            onChangeText={t => setMobileNumber(t)}
            maxLength={10}
            style={{paddingHorizontal: 5}}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={SaveUserDetails}
        style={
          isActive
            ? styles.button
            : {...styles.button, ...styles.buttondisabled}
        }
        disabled={!isActive}>
        <Text style={styles.submit}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
