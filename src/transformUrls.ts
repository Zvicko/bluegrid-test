import { IUrlObject } from "./model/IUrlObject.js";

export const transformUrls = (urls: string[]): IUrlObject => {
    const result: IUrlObject = {};
    
    urls.forEach(url => {
        const urlParts = url.split('http://')[1].split('/');
        const ip = urlParts[0].split(':')[0];
        const pathParts = urlParts.slice(1);

        if (!result[ip]) {
            result[ip] = [];
        }

        let currentLevel: (string | IUrlObject)[] = result[ip];

        pathParts.forEach((part, index) => {
            if (index === pathParts.length - 1) {
                if(part)
                    currentLevel.push(part);
            } else {
                let existing = currentLevel.find(item => typeof item === 'object' && item.hasOwnProperty(part)) as IUrlObject | undefined;
                if (!existing) {
                    existing = { [part]: [] };
                    currentLevel.push(existing);
                }
                if(existing[part])
                    currentLevel = existing[part];
            }
        });
    });
    
    return result;
};