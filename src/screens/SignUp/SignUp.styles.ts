import { StyleSheet } from "react-native";
import colors from "../../config/Colors";

const styles = StyleSheet.create({
    container: {
        // justifyContent:'center',
        alignItems: 'center',
        marginTop: '10%',
        height: '100%'
    },
    welcomeFont: {
        fontSize: 24,
        color: colors.primarydark
    },
    input: {

        // borderColor: 'black',
        borderWidth: .7,
        width: '75%',
        marginVertical: 15,
        borderRadius: 15,
        paddingHorizontal: 5,
        borderColor: colors.lineargradientbuttondisabled
        // padding:20
    },
    button: {
        backgroundColor: colors.greennotification,
        paddingHorizontal: '12%',
        paddingVertical: '3%',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: '5%',

    },
    buttondisabled: {
        backgroundColor: colors.lightgrey,
    },
    text1: {
        marginRight: 240
    },
    text2: {
        marginRight: 260
    },
    text:{
        marginRight: 200
    },
    submit:{
        fontSize: 20, color: colors.black, fontWeight: '600'
    }

})

export default styles