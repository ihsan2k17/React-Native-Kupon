import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Poppins } from './constant/font';
import FormatTime from './formattime';
interface watchProps {
    elapsedTime: number;
    setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
const StopwatchComponent = ({elapsedTime, setElapsedTime, isRunning, setIsRunning}:watchProps) => {
    /* FUNSGI USEEFFECT DISINI UNTUK MENGHITUNG ANGKA SETIAP 999 MILIDETIK SEKALI AKAN DITAMBAH +1 BEGITU SETERUS NYA,
    LALU, DIUBAH KEDALAM FORMAT TIME YANG ADA DI DALAM COMPONENT FORMAT TIME 
    */
    useEffect(() => {
        let interval: any;

        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 999);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);


    return (
        <View>
            <View style={{padding:10, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:20, fontFamily:Poppins.Bold}}>{FormatTime(elapsedTime)}</Text>
            </View>
        </View>
    );
};

export default StopwatchComponent;