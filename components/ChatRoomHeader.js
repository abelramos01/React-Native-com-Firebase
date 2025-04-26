// Importa componentes necessários do React Native
import { View, Text, TouchableOpacity } from 'react-native'
// Importa a biblioteca React
import React from 'react'
// Importa o Stack Navigator do Expo Router
import { Stack } from 'expo-router'
// Importa ícones do Expo Vector Icons
import { Entypo, Ionicons } from '@expo/vector-icons'
// Importa funções para responsividade em diferentes tamanhos de tela
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// Importa o componente de imagem do Expo
import { Image } from 'expo-image';

// Componente que define o cabeçalho personalizado da tela de chat
export default function ChatRoomHeader({user, router}) {
  return (
    <Stack.Screen
        options={{
            title: '', // Remove o título padrão do cabeçalho
            headerShadowVisible: false, // Remove a sombra do cabeçalho
            headerLeft: ()=>( // Define o conteúdo à esquerda do cabeçalho
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={()=> router.back()}> 
                        {/* Botão para voltar à tela anterior */}
                        <Entypo name="chevron-left" size={hp(4)} color="#737373" />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-3">
                        {/* Exibe a imagem do usuário e o nome */}
                        <Image 
                            source={user?.profileUrl}
                            style={{height: hp(4.5), aspectRatio: 1, borderRadius: 100}}
                        />
                        <Text style={{fontSize: hp(2.5)}} className="text-neutral-700 font-medium">
                            {user?.username}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: ()=>( // Define o conteúdo à direita do cabeçalho
                <View className="flex-row items-center gap-8">
                    {/* Ícones para chamada de voz e vídeo */}
                    <Ionicons name="call" size={hp(2.8)} color={'#737373'} />
                    <Ionicons name="videocam" size={hp(2.8)} color={'#737373'} />
                </View>
            )
        }}
    />
  )
}
