import bcrypt, { hash } from 'bcrypt';

const saltRound = 10;

export const hashing = async(password)=> {
    return await bcrypt.hash(password,saltRound);
}