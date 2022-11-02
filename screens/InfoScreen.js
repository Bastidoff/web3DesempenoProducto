import { StyleSheet, Text, View, Touchable, TextInput } from 'react-native';
import { useState } from 'react';
import styles from '../assets/styles';

export default function InfoScreen({ route }){
    return(
        <View style={styles.container}>
            <Text
            style={{fontSize:30, textAlign:"center",margin:"20%"}}
            >
                Detalle
            </Text>
            <Text style={styles.text}>Número de cuenta: {route.params.numeroCuenta}</Text>
            <Text style={styles.text}>Titular: {route.params.titular}</Text>
            <Text style={styles.text}>Fecha: {route.params.fecha}</Text>
            <Text style={styles.text}>Saldo: {route.params.saldo}</Text>
        </View>
    )
}