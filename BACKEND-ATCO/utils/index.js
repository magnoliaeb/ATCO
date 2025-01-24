import { v4 as uuidv4 } from 'uuid';

export const generateToken = async () => {
    const uuid = uuidv4().replace(/-/g, '').slice(0, 12);
    return uuid
}