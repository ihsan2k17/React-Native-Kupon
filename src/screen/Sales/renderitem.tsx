import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Sales } from '../../models/sales';
import Color from '../../components/constant/color';

interface renderProps {
    index: number;
    item: Sales;
}

const img = '../../assets/icons/salesmanicon.png'


const RenderItem = ({ item, index }: renderProps) => {
    const colors = [Color.primary, Color.secondary, Color.background, Color.blue1Primary, Color.blue3Secondary];
    const colorindeks = index % colors.length;
    return (
        <View style={{
            flex:1,
            paddingHorizontal: 20,
        }}>
            <View style={styles.divContainer}>
                <View
                    style={[styles.containerImage,{ backgroundColor: colors[colorindeks]}]}/>
                <Image
                    source={require(img)}
                    style={styles.image} />
                <View style={styles.containerSalesName}>
                    <Text style={styles.nameSales}>{item.Sales_Name}</Text>
                </View>
                <View style={styles.containerSalesId}>
                    <Text style={styles.salesId}>{item.SalesID}</Text>
                </View>
            </View>
        </View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    nameSales: {
        fontSize: 15,
        fontWeight: '600',
        color: Color.text,
        opacity: 0.8
    },
    containerSalesName: {
        position: 'absolute',
        bottom: 35,
        left: 90
    },
    salesId: {
        fontSize: 12,
        fontWeight: '400',
        color: Color.text,
        opacity:0.7
    },
    containerSalesId: {
        position: 'absolute',
        bottom: 20,
        left: 90
    },
    image: {
        position: 'absolute',
        left: 25,
        width: 40,
        height: 40,
        aspectRatio: 1,
    },
    containerImage: {
        
        paddingHorizontal: 15,
        borderRadius: 10,
        opacity: 0.5,
        height: 50,
        width: 60
    },
    divContainer: {
        flexDirection: 'row',
        gap: 10,
        height: 60,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'white',
        opacity: 0.8,
        paddingHorizontal: 15,
    }
})
