import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker } from 'react-native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import { React, useState } from 'react';
import styles from '../assets/styles';

export default function LoginScreen(){

    const navigation = useNavigation();

    const {control, handleSubmit, getValues, setValues, formState:{errors, isValid}}=useForm({
        defaultValues:{
            usuario: '',
            rol:'',
            contrasena:''
        },
        //mode:'onChange'
    })

    const [rol, setRol] = useState("Admin");

    const onSubmit = data => {
        console.log(data)
        validar(getValues('usuario'),getValues('contrasena'))
    }

    const usuarios = [
        {
            usuario: 'admin',
            rol: 'Administrador',
            contrasena: 'Aa123456!'
        },
        {
            usuario: 'user',
            rol: 'Invitado',
            contrasena: 'Aa123456!'
        }
    ]


    function validar(usuario,contrasena){
        var existe=0;
        for (let index = 0; index < usuarios.length; index++) {
            if(usuarios[index].usuario==usuario && usuarios[index].contrasena==contrasena){
                existe=1;
                if(usuarios[index].rol=="Administrador")
                    navigation.navigate('Cuentas', {usuario})
                else{
                    console.log("El usuario no tiene cuenta de administrador")
                }
            }
            
            if(existe==0){
                console.log("El usuario no existe")
            }    
            
        }
    }

    return(
        <View style={styles.container}>
            <Text
            style={{fontSize:30, textAlign:"center",margin:"20%", textAlignVertical:"top"}}
            >
                Sistema Bancario
            </Text>

            <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /^([a-zA-ZùÙüÜäàáëèéïìíöòóüùúÄÀÁËÈÉÏÌÍÖÒÓÜÚñÑ\s]+)$/,
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.usuario?.type=='required' || errors.usuario?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Usuario'
                    />
                )}
                name='usuario'
            />
            {errors.usuario?.type=='required' && <Text style={{color:'red'}}>El usuario es obligatorio</Text>}
            {errors.usuario?.type=='pattern' && <Text style={{color:'red'}}>Solo se permiten letras</Text>}

            <Picker
                selectedValue={rol}
                style={styles.inputs}
                onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
            >
                <Picker.Item label="Administrador" value="Administrador" />
                <Picker.Item label="Invitado" value="Invitado" />
            </Picker>

            <Controller
                control={control}                                
                rules={{
                    required:true, 
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                }}
                render={({field:{onChange, onBlur, value}})=>(
                    <TextInput
                        style={[styles.inputs, {borderColor: errors.contrasena?.type=='required' || errors.contrasena?.type=='pattern' ? 'red' : 'green'}]}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder='Contraseña'
                    />
                )}
                name='contrasena'
            />
            {errors.contrasena?.type=='required' && <Text style={{color:'red'}}>La contraseña es obligatoria</Text>}
            {errors.contrasena?.type=='pattern' && <Text style={{color:'red'}}>Debe contener 8 caracteres, al menos una mayúscula, una minúscula y un número. Puede contener caracteres especiales.</Text>}
            <TouchableOpacity
                style={{backgroundColor:'#005C53', padding:5, borderRadius:10, marginTop:10, width:100, textAlign:'center'}}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={{color:'white'}}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}