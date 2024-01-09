import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Poppins } from './constant/font';

const FormatTime = (seconds:number) => {
    const HH = Math.floor(seconds / 3600); //HH UNTUK VARIABEL SATUAN JAM
    const MM = Math.floor((seconds % 3600) / 60); // MM VARIABEK UNTUK MENYIMPAN SATUAN MENIT
    const SS = seconds % 60; // SS UNTUK MENYIMPAN VARIABEL SATAUN DETIK 

    return `${HH.toString().padStart(2, '0')}:${MM.toString().padStart(2, '0')}:${SS.toString().padStart(2, '0')}`;
}

export default FormatTime

const styles = StyleSheet.create({

})