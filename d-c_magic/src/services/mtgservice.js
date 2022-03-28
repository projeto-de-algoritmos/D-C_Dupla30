import { card } from 'mtgsdk';

export const getAllCardsByName = async(cardName, page) => {
    try {
        const res = await card.where({name: cardName, pageSize: 20, page}).filter(card => !!card.imageUrl);
        return res;    
    } catch (error) {
        console.log(error)
    }
};

export const getAllCardsByColor = async(color, page) => {
    try {
        const res = await card.where({color, pageSize: 20, page}).filter(card => !!card.imageUrl);
        return res;    
    } catch (error) {
        console.log(error)
    }
}