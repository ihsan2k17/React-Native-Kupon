import HomeScreen from "../../screen/Home/HomeScreen";
import BottomSheet from "../bottomsheet";
import Color from "./color";
import { Icons } from "./icon";

export const TabArr = [
    { route: 'HomeScreen', label: 'HomeScreen', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: HomeScreen },
    { route: 'Profile', label: 'Profile', type: Icons.MaterialCommunityIcons, activeIcon: 'account-circle', inActiveIcon: 'account-circle-outline', component: BottomSheet },
]