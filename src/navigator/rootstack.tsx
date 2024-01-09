import BottomSheetScreen from "../screen/bottomscreen"
import { NavigatorScreenParams } from '@react-navigation/native'
import BottomStack, { TabStackParamList } from "./BottomStack";
import SalesPage from "../screen/Sales/salespage";
import CustomerPage from "../screen/Customer/customerpage";
import HadiahPage from "../screen/Hadiah/hadiahPage";
import CreateHadiah from "../screen/Hadiah/create";
import LoginScreen from "../screen/Login/LoginPage/LoginScreen";
import RegisterScreen from "../screen/Login/RegisterPage/registerscreen";
import ForgotScreen from "../screen/Login/ForgotPasswordPage/forgotscreen";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import KuponPage from "../screen/Kupon/kuponpage";
import DetailKuponPage from "../screen/Kupon/DetailKupon/detailkuponpage";
import InputKupon from "../screen/Kupon/inputkupon/inputkupon";
import DetailCustomerPage from "../screen/Customer/DetailCustomer/detailcustomerpage";
import AddCustomer from "../screen/Customer/addcustomer/addcustomer";
import EditKupon from "../screen/Kupon/Edit/editkupon";
import AgenPage from "../screen/Agen/ListAgen/agenpage";
import AddAgen from "../screen/Agen/AddAgen/addagen";
import InputVoucher from "../screen/Kupon/inputvoucher/inputvoucher";
import EditHadiah from "../screen/Hadiah/editHadiah";
import EditVoucher from "../screen/Kupon/Edit/editvoucher";
import CustomerNakamiPage from "../screen/CustomerNakami/customernakamipage";
import KuponNakamiPage from "../screen/KuponNakami/kuponnakamipage";
import DetailCustomerNakamiPage from "../screen/CustomerNakami/DetailCustomer/detailcustomerpagenkm";
import AddCustomerNakami from "../screen/CustomerNakami/addcustomer/addcustomer";
import EditHadiahNakami from "../screen/HadiahNakami/editHadiahNakami";
import HadiahNakamiPage from "../screen/HadiahNakami/hadiahnakamipage";
import DetailKuponNakamiPage from "../screen/KuponNakami/DetailKupon/detailkuponpagenkm";
import EditKuponNakami from "../screen/KuponNakami/Edit/editkuponnkm";
import EditVoucherNakami from "../screen/KuponNakami/Edit/editvouchernkm";
import InputKuponNakami from "../screen/KuponNakami/inputkupon/inputkuponnkm";
import InputVoucherNakami from "../screen/KuponNakami/inputvoucher/inputvouchernkm";
import Onboarding from "../screen/onboarding/onboarding";

export type RootStackParamList = {

    onBoarding: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    ForgotScreen: undefined;
    TabStack: NavigatorScreenParams<TabStackParamList>;
    salesPage: undefined;

    customerPage: undefined;
    customerNakamiPage: undefined;
    DetailCustomerPage: { customerCustomer: string }
    DetailCustomerNakamiPage: {customernakamiCustomer:string}
    AddCustomer: undefined;
    AddCustomerNakami: undefined;

    KuponPage: undefined;
    KuponNakamiPage: undefined;
    InputKupon: undefined;
    InputKuponNakami: undefined;
    InputVoucher: undefined;
    InputVoucherNakami: undefined;
    DetailKuponPage: {
        kuponId?: number, kuponPoin?: number,
        kuponTahun?: number,
        kuponUser: string,
        kuponHadiah?: number,
        kuponPeriode?: number,
        kuponNamaHadiah: string
    };
    DetailKuponNakamiPage: {
        kuponnakamiId?: number, kuponnakamiPoin?: number,
        kuponnakamiTahun?: number,
        kuponnakamiUser: string,
        kuponnakamiHadiah?: number,
        kuponnakamiPeriode?:number,
        kuponnakamiNamaHadiah: string
    };
    EditKupon: { kuponId?: number, kuponPoin?: number, kuponKupon?: number };
    EditKuponNakami: { kuponnakamiId?: number, kuponnakamiPoin?: number, kuponnakamiKupon?: number };
    EditVoucher: { kuponId?: number, kuponPoin?: number, kuponVoucher?: number };
    EditVoucherNakami: { kuponnakamiId?: number, kuponnakamiPoin?: number, kuponnakamiVoucher?: number };

    hadiahPage: undefined;
    hadiahNakamiPage: undefined;
    editHadiahPage: { hadiahBarang: string };
    editHadiahNakamiPage: { hadiahNakamiBarang: string };
    createHadiah: undefined;

    DetailScreen: undefined;
    BottomSheetScreen: undefined;
    AgenPage: undefined;
    AddAgen: undefined;
}

const rootStack = createStackNavigator<RootStackParamList>();
const RootStack = () => {
    return (
        <rootStack.Navigator screenOptions={{
        }}>
            <rootStack.Screen name="onBoarding" component={Onboarding} options={{
                headerShown: false,
                gestureEnabled:true,
                cardStyleInterpolator:CardStyleInterpolators.forFadeFromCenter
            }} />
            <rootStack.Screen name="LoginScreen" component={LoginScreen} options={{
                headerShown: false,
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }} />
            <rootStack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                headerShown: false,
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }} />
            <rootStack.Screen name="ForgotScreen" component={ForgotScreen} options={{
                headerShown: false,
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
            }} />
            <rootStack.Screen name="TabStack" component={BottomStack} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="salesPage" component={SalesPage} options={{
                headerShown:false,
            }} />
            <rootStack.Screen name="KuponPage" component={KuponPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="KuponNakamiPage" component={KuponNakamiPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="InputKupon" component={InputKupon} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="InputKuponNakami" component={InputKuponNakami} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="InputVoucher" component={InputVoucher} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="InputVoucherNakami" component={InputVoucherNakami} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="DetailKuponPage" component={DetailKuponPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="DetailKuponNakamiPage" component={DetailKuponNakamiPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="EditKupon" component={EditKupon} options={{
                headerShown:false
            }} />
            <rootStack.Screen name="EditKuponNakami" component={EditKuponNakami} options={{
                headerShown: false
            }} />
            <rootStack.Screen name="EditVoucher" component={EditVoucher} options={{
                headerShown: false
            }} />
            <rootStack.Screen name="EditVoucherNakami" component={EditVoucherNakami} options={{
                headerShown: false
            }} />
            <rootStack.Screen name="customerPage" component={CustomerPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="customerNakamiPage" component={CustomerNakamiPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="DetailCustomerPage" component={DetailCustomerPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="DetailCustomerNakamiPage" component={DetailCustomerNakamiPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="AddCustomer" component={AddCustomer} options={{
                headerShown:false
            }} />
            <rootStack.Screen name="AddCustomerNakami" component={AddCustomerNakami} options={{
                headerShown: false
            }} />
            <rootStack.Screen name="hadiahPage" component={HadiahPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="hadiahNakamiPage" component={HadiahNakamiPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="editHadiahPage" component={EditHadiah} options={{
                headerShown:false
            }} />
            <rootStack.Screen name="editHadiahNakamiPage" component={EditHadiahNakami} options={{
                headerShown: false
            }} />
            <rootStack.Screen name="createHadiah" component={CreateHadiah} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="AgenPage" component={AgenPage} options={{
                headerShown: false,
            }} />
            <rootStack.Screen name="AddAgen" component={AddAgen} options={{
                headerShown: false,
            }} />
            
            <rootStack.Screen name="BottomSheetScreen" component={BottomSheetScreen} options={{
                headerShown:false
            }} />
        </rootStack.Navigator>
    )
}

export default RootStack;
