import jwt from "jsonwebtoken";

export const tokenSign = async (user) => {
  const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta';
  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: "2h" }
  );
  return token;
};

// export const tokenVerify = async (token) => {
//    const decoded = jwt.verify(token, SECRET_KEY);
//    return decoded;
// }

export const refreshToken = async (user) => {
  const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta';
  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: "2h" }
  );
  return token;
};

// export const decodeToken = async (token) => {
//    const decoded = jwt.verify(token, SECRET_KEY);
//    return decoded;
// }
