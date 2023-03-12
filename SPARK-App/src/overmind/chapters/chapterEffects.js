import axios from 'axios';

export const getAllChapters = async () => {
    const chapters = await axios.get('http://localhost:8080/chapters/');
    return chapters.data;
};