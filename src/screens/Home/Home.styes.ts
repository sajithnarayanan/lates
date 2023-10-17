import { StyleSheet } from "react-native";
import colors from "../../config/Colors";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    input: {
        borderWidth: .7,
        width: '75%',
        marginVertical: 15,
        borderRadius: 15,
        paddingHorizontal: 5,
        borderColor: colors.lineargradientbuttondisabled
    },
    button: {
        backgroundColor: colors.lightgrey,
        paddingHorizontal: '12%',
        paddingVertical: '3%',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: '5%',

    },
    buttondisabled: {
        backgroundColor: colors.lightgrey,
    },
    text:{
        marginRight: 200
    },
    text1:{
        marginRight:240
    },
    text2:{
        marginRight:260
    }
})

export default styles