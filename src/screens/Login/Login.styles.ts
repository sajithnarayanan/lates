import { StyleSheet } from "react-native";
import colors from "../../config/Colors";

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        marginTop:20
    },
    welcomeFont: {
        fontSize: 24,
        color: colors.primarydark
    },
    input: {
        width: '90%',
        borderColor: 'black',
        borderWidth: .7,
        margin: 20,
    },
    button: {
        backgroundColor: 'grey',
        width: 100,
        height: 30,
        alignItems: 'center'
    },
    login: {
        fontSize: 14,
        color: 'black',
        marginTop: 5
    },
    register: {
        marginTop: 30,
       
    },
    submit:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
    }
})

export default styles