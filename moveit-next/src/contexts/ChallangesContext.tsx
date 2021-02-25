import { createContext, ReactNode, useEffect, useState } from 'react';
import challanges from '../../challenges.json'

interface Challange {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallangesContextData {
    level: number; 
    currentExperience: number;
    experienceToNextLevel: number;
    challangesCompleted: number; 
    levelUp: ()=> void;
    startNewChallange: () => void;
    activeChallange: Challange;
    resetChallange: () =>void;
    completeChallange: () => void;
}

interface ChallangesProviderProps{
    children: ReactNode
}

export const ChallangesContext = createContext( {} as ChallangesContextData );

export function ChallangesProvider( {children }: ChallangesProviderProps ) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(30);
    const [challangesCompleted, setChallangesCompleted] =useState(0);

    const [activeChallange, setActiveChallange] = useState(null);

    const experienceToNextLevel = Math.pow((level +1 ) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    useEffect(()=>{
        Notification.requestPermission();
    });

    function startNewChallange() {
        const randomChallangeIndex = Math.floor(Math.random() * challanges.length);
        const challange = challanges[randomChallangeIndex];
        setActiveChallange(challange);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉',{
                body: `Valendo ${challange.amount}xp!`
            })
        }
    }

    function resetChallange(){
        setActiveChallange(null);
    }

    function completeChallange() {
        if(!activeChallange) {
            return;
        }

        const {amount} = activeChallange;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel ) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallange(null);
        setChallangesCompleted(challangesCompleted+1);    
    }

    return (
        <ChallangesContext.Provider  
            value={{
            level, 
            currentExperience,
            experienceToNextLevel,
            challangesCompleted, 
            levelUp,
            startNewChallange,
            activeChallange,
            resetChallange,
            completeChallange
        }}
        >
            {children}
        </ChallangesContext.Provider>
    );
}

