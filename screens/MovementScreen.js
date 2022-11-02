import styles from '../assets/styles';
import { StyleSheet, Text, View, Touchable, TextInput } from 'react-native';
import { useState } from 'react';

export default function MovementScreen(){
    return(
        <View style={styles.container}>
            <Text
            style={{fontSize:30, textAlign:"center",marginTop:"20%"}}
            >
                Movimientos
            </Text>
        </View>
    )
}