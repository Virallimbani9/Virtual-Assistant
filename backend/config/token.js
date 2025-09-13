import jwt from 'jsonwebtoken';

export const getToken = (userId) => {
    // For simplicity, using a base64 encoded string as a token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
    return token;
}