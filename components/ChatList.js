// Importa componentes básicos do React Native e o React
import { View, Text, FlatList } from 'react-native'
import React from 'react'
// Importa o componente de item de chat
import ChatItem from './ChatItem'
// Importa o hook de navegação do Expo Router
import { useRouter } from 'expo-router'

// Componente principal que renderiza a lista de chats
export default function ChatList({users, currentUser}) {
    // Inicializa o hook de navegação
    const router = useRouter();
    
    return (
        <View className="flex-1">
            <FlatList
                data={users} // Lista de usuários a serem exibidos
                contentContainerStyle={{flex: 1, paddingVertical: 25}} // Estilização do container da lista
                keyExtractor={item => Math.random()} // Gera uma chave única para cada item (não recomendado usar Math.random() em produção)
                showsVerticalScrollIndicator={false} // Esconde a barra de rolagem vertical
                renderItem={({item, index}) => 
                    <ChatItem 
                        noBorder={index + 1 == users.length} // Remove a borda do último item
                        router={router} // Passa o roteador para navegação
                        currentUser={currentUser} // Passa o usuário atual para comparação
                        item={item} // Dados do usuário atual
                        index={index} // Índice do item na lista
                    />
                }
            />
        </View>
    )
}
