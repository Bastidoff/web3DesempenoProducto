import styles from '../assets/styles';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import { React, useState } from 'react';



export default function AccountScreen( {route} ){

    const navigation = useNavigation();

    const {control, handleSubmit, getValues, setValues, formState:{errors, isValid}}=useForm({
        defaultValues:{
            numeroCuenta:numeroCuenta(),
            identificacion:'',
            tutular:'',
            fecha:'',
            saldo:''
        },
        mode:'onChange'
    })



    function numeroCuenta(){
        var cuenta='';
        for (let index = 0; index < 12; index++) {
            const numero = Math.floor(Math.random() * ((9+1)-0)+0);
            cuenta=cuenta+`${numero}`;            
        }
        return cuenta;
    }

    const onSubmit = data => {
        console.log(data)
        if(errors.identificacion?.type && errors.fecha?.type && errors.saldo?.type && errors.tutular?.type){                    
            console.log("Verifique las validaciones")
            }
        else{
            navigation.navigate('InfoScreen', {
                numeroCuenta : getValues('numeroCuenta'),
                identificacion : getValues('identificacion'),
                titular : getValues('tutular'),
                fecha : getValues('fecha'),
                saldo : getValues('saldo')
            })
        }
    }


    
    var valido=0;

    return(       

        <View style={styles.container}>
            <Text style={styles.text}>Bienvenido: {route.params.usuario}</Text>
            <Text style={{fontSize:15}}>Número de Cuenta</Text>
            <Controller
                control={control}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        editable={false}
                        style={{textAlign:'center', color:'#042940', fontSize:20, fontWeight:'bold'}}
                    />
                )}
                name='numeroCuenta'
            />

            <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /[^a-z ]\ *([.0-9])*\d/g,
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.identificacion?.type=='required' || errors.identificacion?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Identificación'
                    />
                )}
                name='identificacion'
            />
            {errors.identificacion?.type=='required' && <Text style={{color:'red'}}>La identificación es obligatoria</Text>}
            {errors.identificacion?.type=='pattern' && <Text style={{color:'red'}}>Solo se permiten números</Text>}

            <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /^([a-zA-ZùÙüÜäàáëèéïìíöòóüùúÄÀÁËÈÉÏÌÍÖÒÓÜÚñÑ\s]+)$/,
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.identificacion?.type=='required' || errors.identificacion?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Titular de la cuenta'
                    />
                )}
                name='tutular'
            />
            {errors.tutular?.type=='required' && <Text style={{color:'red'}}>La identificación es obligatoria</Text>}
            {errors.tutular?.type=='pattern' && <Text style={{color:'red'}}>Solo se permiten letras o espacios</Text>}

            <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/,
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.identificacion?.type=='required' || errors.identificacion?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Fecha'
                    />
                )}
                name='fecha'
            />
            {errors.fecha?.type=='required' && <Text style={{color:'red'}}>La fecha es obligatoria</Text>}
            {errors.fecha?.type=='pattern' && <Text style={{color:'red'}}>Solo formato fecha DD/MM/AAAA</Text>}

            <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /[^a-z ]\ *([.0-9])*\d/g,
                    min: 1000000,
                    max: 100000000
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.identificacion?.type=='required' || errors.identificacion?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Saldo'
                    />
                )}
                name='saldo'
            />
            {errors.saldo?.type=='required' && <Text style={{color:'red'}}>El saldo es obligatorio</Text>}
            {errors.saldo?.type=='pattern' && <Text style={{color:'red'}}>Solo se permiten números</Text>}
            {errors.saldo?.type=='min' && <Text style={{color:'red'}}>El saldo debe ser entre 1 millón y 100 millones</Text>}
            {errors.saldo?.type=='max' && <Text style={{color:'red'}}>El saldo debe ser entre 1 millón y 100 millones</Text>}

            <TouchableOpacity
                style={{backgroundColor:'#005C53', padding:5, borderRadius:10, marginTop:10, width:100, textAlign:'center'}}
                onPress={handleSubmit(onSubmit)}>
                <Text style={{color:'white'}}>Enviar</Text>
            </TouchableOpacity>
        </View>
    )
}