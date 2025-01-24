import jwt from 'jsonwebtoken';
// import errorHandle from '../utils/error.js';

export const verifyToken = async (req, res, next) => {
    // Obtener la cookie de autorización
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No tienes permiso para acceder a este recurso.',
            error: 'NO_TOKEN',
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'El token ha expirado. Por favor, inicia sesión nuevamente.',
                error: 'TOKEN_EXPIRED',
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'El token es inválido.',
                error: 'INVALID_TOKEN',
            });

        }


    }
}


// export const verifyAdmin = async (req, res, next) => {
//     if (req.user.roleId !== 1) {
//         return res.status(403).json({
//             success: false,
//             message: 'No tienes permiso para acceder a este recurso.',
//             error: 'FORBIDDEN',
//         });
//     }
//     next();
// };

// export const verifyUser = async (req, res, next) => {
//     if (req.user.roleId !== 2) {
//         return res.status(403).json({
//             success: false,
//             message: 'No tienes permiso para acceder a este recurso.',
//             error: 'FORBIDDEN',
//         });
//     }
//     next();
// }

// export const verifyUserOrAdmin = async (req, res, next) => {
//     if (req.user.roleId !== 1 && req.user.roleId !== 2) {
//         return res.status(403).json({
//             success: false,
//             message: 'No tienes permiso para acceder a este recurso.',
//             error: 'FORBIDDEN',
//         });
//     }
//     next();
// }

// export const verifyGuest = async (req, res, next) => {
//     if (req.user.roleId !== 3 && req.user.roleId !== 1) {
//         return res.status(403).json({
//             success: false,
//             message: 'No tienes permiso para acceder a este recurso.',
//             error: 'FORBIDDEN',
//         });
//     }
//     next();
// }