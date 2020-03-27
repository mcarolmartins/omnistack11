import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png';
import styles from './style'

export default function Details(){
    const navigation = useNavigation();
    const route = useRoute();
    const caso = route.params.caso;

    const mesage = `Olá ${caso.name}, estou entrando em contato pois gostaria de ajudar no caso "${caso.title}" com o valor de R$ ${caso.value}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Héroi do caso: ${caso.title}`,
            recipients: [caso.email],
            body: mesage,
        });
    }

    function sendWpp(){
        Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${mesage}`);
    }

    return (
    //header
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logoImg}/>
            <TouchableOpacity onPress={navigateBack}>
                <Feather name="arrow-down" size={28} color="#E82041"/>
            </TouchableOpacity>
        </View>
        {/* centro */}
        <View style={styles.caso}>
            <Text style={[styles.casoOng, {marginTop: 0}]}>ONG:</Text>
            <Text style={styles.casoValue}>{caso.name}</Text>

            <Text style={styles.casoOng}>CASO:</Text>
            <Text style={styles.casoValue}>{caso.title}</Text>

            <Text style={styles.casoOng}>VALOR:</Text>
            <Text style={styles.casoValue}>
                {Intl.NumberFormat('pt-BR',
                {style: 'currency',
                currency: 'BRL'})
                .format(caso.value)}
            </Text> 
        </View>

        {/* entrar em contato */}
        <View style={styles.contatoBox}>
            <Text style={styles.heroTitle}>Salve o dia!</Text>
            <Text style={styles.heroTitle}>Seja o héroi desse caso.</Text>

            <Text style={styles.heroDesc}>Entre em contato:</Text>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={sendWpp}>
                    <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={sendMail}>
                    <Text style={styles.actionText}>E-mail</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );
}