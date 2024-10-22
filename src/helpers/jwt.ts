const jwt = require("jsonwebtoken");

export const generateJWT = (
  uid: string,
  login?: string,
  expiresIn: string = process.env.EXPIRE_IN || "12h",
  jwtSecret = process.env.JWT_SECRET
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      login,
    };
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: expiresIn,
      },
      (err: string, token: string) => {
        if (err) {
          console.error(err);
          reject("Cannot generate the JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
