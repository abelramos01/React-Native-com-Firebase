// Importa funções do React e do Firebase
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Componente provedor do contexto de autenticação
export const AuthContextProvider = ({ children }) => {
    // Estado para armazenar o usuário logado
    const [user, setUser] = useState(null);
    // Estado para verificar se o usuário está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    // Efeito para monitorar mudanças no estado de autenticação
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            // Se houver um usuário logado
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid); // Atualiza dados adicionais do usuário
            } else {
                // Se não houver usuário logado
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        // Retorna a função de desinscrição para limpar o listener
        return unsub;
    }, []);

    // Função para buscar e atualizar os dados adicionais do usuário no Firestore
    const updateUserData = async (userId) => {
        const docRef = doc(db, 'users', userId); // Referência ao documento do usuário
        const docSnap = await getDoc(docRef); // Obtém o documento

        if (docSnap.exists()) {
            let data = docSnap.data();
            // Atualiza o estado do usuário com os dados adicionais
            setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId });
        }
    }

    // Função para login do usuário
    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (e) {
            let msg = e.message;
            // Tratamento de erros comuns
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/invalid-credential)')) msg = 'E-mail ou Senha errada';
            return { success: false, msg };
        }
    }

    // Função para logout do usuário
    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message, error: e };
        }
    }

    // Função para registrar um novo usuário
    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', response?.user);

            // Cria um documento com dados adicionais no Firestore
            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            });

            return { success: true, data: response?.user };
        } catch (e) {
            let msg = e.message;
            // Tratamento de erros comuns
            if (msg.includes('(auth/invalid-email)')) msg = 'E-mail inválido';
            if (msg.includes('(auth/email-already-in-use)')) msg = 'Esse e-mail já está em uso';
            return { success: false, msg };
        }
    }

    // Retorna o provedor do contexto com os valores disponíveis
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook customizado para consumir o contexto de autenticação
export const useAuth = () => {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}
