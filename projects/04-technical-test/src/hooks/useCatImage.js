import { useState, useEffect } from 'react';
import { getWords } from '../utils/getWords';

export const useCatImage = ({ fact }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (!fact) return;

        const firstWord = getWords(fact, 3);

        fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
            .then((res) => res.json())
            .then((data) => {
                const { url } = data;
                setImageUrl(url);
            });
    }, [fact]);

    return { imageUrl };
}