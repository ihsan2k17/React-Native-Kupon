import { StyleSheet } from "react-native";
import Color from "../../../components/constant/color";
import { Poppins } from "../../../components/constant/font";

const RegisterStyle = StyleSheet.create({
    RegisterScreen: {
        backgroundColor: Color.icon,
        paddingHorizontal: 10,
    },
    RegisterAreaView: {
        backgroundColor: Color.icon,
    },
    ContainerRegister: {
        justifyContent: 'center',
        backgroundColor: '#eff2f5',
        borderRadius: 30,
    },
    FormRegis: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        gap: 20
    },
    BoxUsername: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.border,
    },
    textUsername: {
        flex: 1, borderBottomWidth: 1, fontSize: 16, paddingLeft: 10, borderColor: Color.border, fontFamily:Poppins.Medium
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
        fontSize: 16, color: Color.border, width: '90%', fontFamily:Poppins.Medium
    },
    BoxCredentials: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.border,
    },
    textCredentials: {
        flex: 1, borderBottomWidth: 1, fontSize: 16, paddingLeft: 10, borderColor: Color.border, fontFamily:Poppins.Medium
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
        fontFamily:Poppins.SemiBold
    },
    buttonlRegister: {
        backgroundColor: Color.primary,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});

export default RegisterStyle;