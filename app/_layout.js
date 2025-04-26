//importa componentes essenciais do React Native para estruturação da interface do usuário

import {view, text } from "react-native";
//importa React e o hook useEffect para gerenciar efeitos colaterais no cilco de vida do compronente
import React, {useEffect} from "react";
//importa Slot para renderizar o conteudo da rota atual, useRouter para a navegação e useSegments para monitorar segmentos de rota
import {Slot, useRouter, useSegments } from 'expo-router';

//importa o arquivo de estilo global (CSS para estilizar o aplicativo
import "../global.css";
//importa o contexto de autenticação e o provider para gerenciar o estado de autenticação no aplicativo
import { authContextProvider, useAuth } from '../context/authContext';
//importa MenuProvider para fornecer suporte e menus pop-pp em todo aplicativo
import { MenuProvider } from 'react-native-popup-menu';
import { useRouter, useSegments } from "expo-router";

//Componente principal que gerencia a navegação e autenticação do usuário
const MainLayout = () => {
    
    //obtém o estado de autenticação do usuario a partir do contexto da autenticação
    const {isAuthenticated } = useAuth();
    //obtem os segmentos de rota atuais 
    const segments = useSegments();
    //hook para navegação entre rotas
    const router = useRouter();

    //useEffect que é executado sempre que p estado de autenticação mud
    useEffect(() => {
        //verifica se o estado de autenticação está indefinido
        if (typeof isAuthenticated == 'undefined'  ) return;

        //verifica se o estado de está e, uma rota dentro de aplicaçãp (app)
        const inApp = segments[0] == '(app)';

        //se o ususário está autenticado e não está em uma rota dentro da aplicação, redirenciona para a rota 'home'
        if (isAuthenticated && !inApp) {
            router.replace('home');
        }
        //se o usuário não está autenticado , redireciona para a rota de login (singIn)
        else if (isAuthenticated == false){
            router.replace('singIn');
        }
    }, [isAuthenticated]) // hook é executado novemente se 'isAuthenticated' mudar 

    //retorna o Slot, que renderiza a rota ativa com base no roteamento do expo router
    return <Slot />
}

//componente raiz que envolve o aplicativo com provedores de contexto
export default function RootLayout(){
    return(
        //MenuProvider oferece suporte a menus pop-up em todo o aplicativo
        <MenuProvider>
            {/*AuthContextProvider oferece o contexto de autenticação para todo o aplicativo*/}
            <AuthContextProvider>
                {/* MainLayout gerencia a navegação basease na autenticação */}
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}









