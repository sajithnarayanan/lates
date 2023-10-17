import {StyleSheet} from 'react-native';
import colors from '../../config/Colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dobFont: {
    fontSize: 17,
    color: colors.black,
  },
  userNameFont: {
    fontSize: 25,
    color: colors.lineargradientbutton2,
    fontWeight: '600',
  },
  mobileNumberFont: {
    fontSize: 17,
    color: colors.black,
    fontWeight: '600',
  },
  emailIdFont: {
    fontSize: 17,
    color: colors.primarydark,
  },
  content: {
    justifyContent: 'space-evenly',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '80%',
    backgroundColor: colors.lightgrey,
    marginTop: 10,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {width: 25, height: 25},
  imageContainer: {alignSelf: 'flex-end', marginTop: 15},
  noContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  nullText: {fontWeight: 'bold', color: 'black'},
});

export default styles;
