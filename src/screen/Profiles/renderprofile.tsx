import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Login } from '../../models/login'
import Face from '../../components/constant/profile';
import Color from '../../components/constant/color';
interface props {
    item: Login;
    index:number
}
const RenderProfile = ({ item, index }: props) => {
    const muka = [
        Face.kumon1,
        Face.kumon2,
        Face.kumon3,
        Face.kumon4,
        Face.kumon5,
        Face.kumon6,
        Face.kumon7,
        Face.kumon8]
    const mukaidx = index % muka.length;
    let colorStatus = 'black';
    if (item.Status === 'Active') {
        colorStatus = 'blue';
    } else if (item.Status === 'Deactive') {
        colorStatus = 'grey';
    } else if (item.Status === 'Inactive') {
        colorStatus = 'red';
    } else {
        colorStatus = 'red';
    }
    
    return (
        <View style={{flexDirection:'row', gap:5, borderBottomWidth:1,paddingVertical:5, borderColor:'black'}}>
            <Image source={muka[mukaidx]} style={{
                height: 50,
                width:50
            }} />
            <View>
                <Text>{item.Username}</Text>
                <Text>{item.Role}</Text>
            </View>
            <View style={{ flex:1, alignItems:'flex-end', paddingVertical:5 }}>
                <View style={{ height: 10, width: 10, backgroundColor: colorStatus, borderRadius:10 }}></View>
            </View>
        </View>
    )
}

export default RenderProfile;