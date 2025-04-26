// Importa os componentes necessários do React Native
import { View, Text, FlatList } from 'react-native' // Importa os componentes para estrutura de layout (View) e listas (FlatList)
 
// Importa o React e a biblioteca de hooks
import React from 'react' // Importa o React, necessário para criação de componentes em React Native

// Importa o componente ChatItem para exibir cada item de chat na lista
import ChatItem from './ChatItem' // Importa o componente que renderiza cada item do chat

// Importa o hook useRouter para navegação entre telas
import { useRouter } from 'expo-router' // Importa o hook useRouter da biblioteca expo-router para navegação

// Função principal que define o componente ChatList, que recebe "users" e "currentUser" como props
export default function ChatList({users, currentUser}) {
    const router = useRouter(); // Usa o hook useRouter para controlar a navegação entre telas

    // Retorna a estrutura visual da tela com a lista de chats
    return (
        <View className="flex-1">  {/* View serve como contêiner principal da tela */}
        
            {/* FlatList é um componente eficiente para renderizar listas de dados */}
            <FlatList
                data={users} // Dados para renderizar, neste caso, a lista de usuários
                contentContainerStyle={{flex: 1, paddingVertical: 25}} // Estilo do conteúdo da lista com padding vertical
                keyExtractor={item => Math.random()} // Função para gerar uma chave única para cada item (geralmente, é melhor usar algo estável como um id)
                showsVerticalScrollIndicator={false} // Desabilita o indicador de rolagem vertical
                renderItem={({item, index}) => (  // Função para renderizar cada item na lista
                    <ChatItem 
                        noBorder={index + 1 == users.length} // Verifica se é o último item para não renderizar a borda
                        router={router} // Passa o router para o componente ChatItem para navegação
                        currentUser={currentUser} // Passa o usuário atual para o ChatItem
                        item={item} // Passa os dados do item atual para o ChatItem
                        index={index} // Passa o índice do item para o ChatItem
                    />
                )}
            />
        </View>
    );
}