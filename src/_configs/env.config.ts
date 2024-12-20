import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const env = {
    port: process.env.PORT,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
    },
    youtube: {
        key: process.env.YOUTUBE_API_KEY,
    },
};

export default env;
