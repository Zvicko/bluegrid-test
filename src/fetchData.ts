import { IData } from "./model/IData.js";
import fetch from 'node-fetch';

const apiUrl = 'https://rest-test-eight.vercel.app/api/test';

export const fetchData = async (): Promise<IData> => {
    const response = await fetch(apiUrl, {compress: true});
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: IData = await response.json() as IData;
    return data;
};