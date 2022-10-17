const { User } = require('../models');

const users = [
    {
        'username': 'Andrew1990',
        'password': 'password1' 
    },
    {
        'username': 'Adam1988',
        'password': 'password2'
    },
    {
        'username': 'marianne1957',
        'password': 'password3'
    }
];

const seedUser = () => User.bulkCreate(users, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUser;



const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedPost = require('./postData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUser();
    await seedPost();
    process.exit(0);
};

seedAll();