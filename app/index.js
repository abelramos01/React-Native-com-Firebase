//importa componentes essenciais do react Native para estruturar a tela de carregamento
import { view, text, ActvityIndicator } from 'react-native'
// importa React para criar compronetes funcinais 
import React from 'react'

//função de componente que exibe uma tela inicial com um indicador de carregamento
export default function StarPage(){
    return(
        //view principal com estilo de fletbox para centralizar o conteudo na tela
        <view style ={{Flex: 1, justifyContent: 'center'}}>
            {/*exibe um indicador de atividade circular, mostrando ao usuário que algo está carregando*/}
            <ActvityIndicator size="large" color="gray" />
            </view>
    )

}