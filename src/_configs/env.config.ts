import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const env = {
    port: process.env.PORT,
};

export default env;
