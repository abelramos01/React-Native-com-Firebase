//importa componentes do React Native para estrututurar a interface e a interatividade
 
import {View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert} from 'react-native'
 
//import React, hooks de estado e referência para gerneciar os imputs e estado de carregamento
import React, {useRef, useState} from 'react'
//importa funções para criar layouts responsivos com base no tamanho da tela
import {widthPercentageToDp as wp, heightPercentage as hp} from 'react-native-responsive-screen';
//importa o componente StatusBar para controlar a barra de status
import {StartBar, StatusBar} from 'expo-status-bar'
//importa ícone do pacote expo, como o icone de email e cadeado para o input de senha
import { Octicons } from '@expo/vector-icons';
//importa o hook de navegação de expo-router par navegação entre telas
import {useRouter} from 'expo-router';
//importa componentes personalizados, como o carregamento (loading) e o gerneciamento de teclado customizado
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
//importa o contexto nde autenticação para gerenciar o login
import {useAuth} from '../context/authContext';
 
//Função de componente para a tela de login
export default function SignIn(){
   //hook de navegação para redirecionar o usuário após o login
   const router = useRouter();
   //useState para gertenciar o estado de carergamento (loading) enquanto o login é processado
   const [loading, setLoading] = useState(false);
   //hook do contexto de autenticaçãop, que inclui a função de login
   const {login} = useAuth();
 
   //useRef cria referenciuas para os inputs de email  e senha
   const emailRef = useRef("");
   const passwordRef = useRef("");
 
   //função que lida com o processo e login
   const handleLogin = async() =>{
      //veridfica se os campos de email e senha estão preenchidos
      if(!emailRef.current || !passwordRef.current){
        Alert.alert('Sign in', "Por favor, preencha todos os campos");
        return;
      }
 
      //Ativa o estado de carregaento e tenta fazer o login co  os dados fornecidos
      setLoading(true);
      const response = await login(emailRef.current, paswordRef.current);
      setLoading(false);
 
      //se o login falhar, exibe uma mensagem de erro
      if(!response.sucess){
        Alert.alert('Sign In', response.msg);
 
      }
   }
 
   return(
       //view customizada para ajustar o layout do teclado ao campo de entrada de texto
       <CustomKeyboardView>
           {/*StatusBar para configurar o estilo a barra de status*/}
           <StatusBar style= "dark" />
           <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} calssName="flex-1 gap-12">
               {/*Exibe uma imgaem de login no topo da tela*/}
               <View clasName="items-center">
                   <image style={{height: hp(25)}} resizeMode= 'contain' source={require('../assets/images/login.png')} />
               </View>
 
               {/*Container dos campos de entrada e botões*/}
 
               <View className="gap-10">
                   {/*Título da tela de login*/}
                   <Text style={{fontSize: hp(4)}} className="font-bold tracking-wider text-center text-nneutral-800">
                    Sign In
                   </Text>
 
                   {/*Camppos de entrada de email e senha*/}
                   <View clasName="gap-4">
                       {/*Campo de entrada de email*/}
                       <View style= {{height: hp(7)}} className="font-row gap-4 px-4 bg-neutral-100
                       items-center
                       rounded-x1">
                        <Octicons name="mail" size={hp(2.7)} color="gray"/>
 
                        <TextInput
                           onChangeText={value => emailRef.Ref.current = value}
                           style={{fontSize: hp(2)}}
                           className="flex-1 font-semibold text-neutral-700"
                           placeholder='E-mail'
                           placeholderTextColor={'gray'}
                           />  
                       </View>
                     {/*Campo de entrada de senha*/}
                     <View className="gap-3">
 
                     
                        <View style= {{height: hp(7)}}   className="flex-row gap-4 px-4 bg-neutral-100
                        items-center
                        rounded-x1">
                            <Octicons name="lock" size={hp(2.7)} color="gray"/>
 
                            <TextInput
                            onChangeText={value => passwordRef.current = value}
                            style={{fontSize: hp(2)}}
                            className="flex-1 font-semibold text-neutral-700"
                            placeholder='Senha'
                            secureTextEntry
                            placeholderTextColor={'gray'}
                        />  
                       </View>
                       {/*Link para a funcionalidade de "esqueci minha senha"*/}
                       <Text style={{fontSize: hp(1.8)}} className='font-semibold text-right text-neutral-500'>Esqueceu a senha?</Text>
                     </View>
 
                     {/*Botão de envio do formulário de login*/}
                     <View>
                        {
                            loading ? (
                                <View clasName="flex-row justify-center">
                                    <Loading size={hp(6.5)}/>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={handleLogin} style={{height: hp(6.5)}} className="bg-indigo-500 rounded-x1 justify-center items-center">
                                    <Text style={{fontSize: hp(2.7)}} className="text-white font-bold tracking-wider">
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                     </View>
 
                     {/*texto para reditrecionar o usuário para a tela de registro /cadastro/*/}
 
                     <View className="flex-row justify-center">
                        <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Não tem uma conta?</Text>
                        <Pressable onPress={() => router.push('signUp')}>
                            <Text style = {{fontSize: hp(1.8)}} className="font-bold text-indigo-500">Sign Up</Text>
                        </Pressable>
                     </View>
                   </View>
               </View>
           </View>
       </CustomKeyboardView>
   )
}



