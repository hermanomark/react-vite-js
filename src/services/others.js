import api from './client';

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');

        return response.data;
    } catch (error) {
        console.log('Error fetching categories', error);

        throw new Error(error.response?.data?.title || 'Error fetching categories!');
    }
}

export const getTypes = async () => {
    try {
        const response = await api.get('/types');

        return response.data;
    } catch (error) {
        console.log('Error fetching types', error);

        throw new Error(error.response?.data?.title || 'Error fetching types!');
    }
}

export const getReatreats = async () => {
    try {
        const response = await api.get('/reatreats');

        return response.data;
    } catch (error) {
        console.log('Error fetching reatreats', error);

        throw new Error(error.response?.data?.title || 'Error fetching reatreats!');
    }
}

export const getRarities = async () => {
    try {
        const response = await api.get('/rarities');

        return response.data;
    } catch (error) {
        console.log('Error fetching rarities', error);

        throw new Error(error.response?.data?.title || 'Error fetching rarities!');
    }
}

export const getHp = async () => {
    try {
        const response = await api.get('/hp');

        return response.data;
    } catch (error) {
        console.log('Error fetching hp', error);

        throw new Error(error.response?.data?.title || 'Error fetching hp!');
    }
}