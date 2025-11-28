import { useState, useEffect } from 'react';
import { getFact } from '../services/facts';

export const useCatFact = () => {
    const [fact, setFact] = useState('');

    const refreshFact = async () => {
        const newFact = await getFact();
        setFact(newFact);
    };

    useEffect(() => {
        refreshFact();
    }, []);

    //* Siempre que se pueda evitar exportar la actualización del estado
    // Si es algo que puede hacer el customHook que lo haga y solo exporte lo necesario
    return { fact, refreshFact };
};