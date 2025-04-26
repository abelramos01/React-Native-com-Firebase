// Importa componentes básicos do React Native
import { Text, View } from 'react-native';

// Importa o componente MenuOption da biblioteca react-native-popup-menu
import {
    MenuOption,
} from 'react-native-popup-menu';

// Importa funções para responsividade com base na porcentagem da tela
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Componente funcional MenuItem que recebe text, action, value e icon como props
export const MenuItem = ({text, action, value, icon})=>{
    return (
        // Define uma opção de menu que executa a função action passando value ao ser selecionada
        <MenuOption onSelect={()=> action(value)}>
            {/* Container que organiza o texto e o ícone em linha */}
            <View className="px-4 py-1 flex-row justify-between items-center">
                {/* Exibe o texto recebido como prop com estilo de fonte e cor */}
                <Text style={{fontSize: hp(1.7)}} className="font-semibold text-neutral-600">
                    {text}
                </Text>
                {/* Exibe o ícone recebido como prop */}
                {icon}
            </View>
        </MenuOption>
    )
}
