import { StyleSheet } from "react-native";
import Color from "../../../components/constant/color";
import { Poppins } from "../../../components/constant/font";

const LoginStyle = StyleSheet.create({
    LoginScreen: {
        flex:1,
        backgroundColor: Color.icon,
        paddingHorizontal: 10,
    },
    LoginAreaView: {
        flex:1,
        backgroundColor: Color.icon,
    },
    containerLogin: {
        justifyContent: 'center',
        backgroundColor: '#eff2f5',
        borderRadius: 30,
    },
    formLogin: {
        paddingHorizontal: 10,
        paddingVertical:10,
        justifyContent: 'center',
        gap:10
    },
    BoxUsername: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderColor: Color.border,
    },
    textUsername: {
        flex: 1, borderBottomWidth: 1, fontSize: 16, paddingLeft: 10, borderColor: Color.border, fontFamily: Poppins.Medium
    },
    containerPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.border,
        position: 'relative',
    },
    boxPassword: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: Color.border
    },
    textPassword: {
        fontSize: 16, color: Color.border, width:'90%', fontFamily:Poppins.Medium
    },
    iconContainer: { 
        top: '5%',
        transform: [{ translateY: -12 }], 
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
    },
    buttonlLogin: {
        backgroundColor: Color.primary,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    }
})

export default LoginStyle;