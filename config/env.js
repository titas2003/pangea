require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    // MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://admin:admin@getwellclust-01.yzq0kba.mongodb.net/pangea?retryWrites=true&w=majority&appName=getwellclust-01',
    MONGO_URI: process.env.MONGO_URI || 'mongodb+srv://admin:admin@aws-dmo.bsoplpt.mongodb.net/projectX',
    JWT_SECRET: process.env.JWT_SECRET || 'pangea-0.1',
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    EMAIL_PORT: process.env.EMAIL_PORT || 587,
    EMAIL_USER: process.env.EMAIL_USER || 'nomail02024@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'rkkr oshm xaun cawk',
};
