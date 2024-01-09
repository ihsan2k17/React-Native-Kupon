import { StyleSheet } from "react-native";

const HomeStyle = StyleSheet.create({
    containerProfile: {
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    borderNotifications: {
        width: 52,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 52,
        borderWidth: 1,
    },
    BorderContainerSearchFilters: {
        flex: 1,
        height: 52,
        width:290,
        borderRadius: 52,
        borderWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        flexDirection: 'row',
        gap: 12
    },
    textSearch: {
        flex: 1, fontSize: 16, opacity: 0.5,
    },
    BorderFilters: {
        width: 52,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 52,
    },
})

export default HomeStyle