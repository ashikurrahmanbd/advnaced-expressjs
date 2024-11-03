import bcrypt from 'bcryptjs';

export const users = [
    {
        id: 1,
        name: "ashik",
        age: 29,
        username: "ashik",
        password: await bcrypt.hash('password123', 10)
         
    },

    {
        id: 2,
        name: "taslima",
        age: 21
    },

    {
        id: 3,
        name: "Akash",
        age: 14
    },

    {
        id: 4,
        name: "Jannat",
        age: 8
    },

    {
        id: 5,
        name: "Shimul",
        age: 27
    },

    {
        id: 6,
        name: "Topu",
        age: 25
    },
    {
        id: 7,
        name: "Tahsan",
        age: 23
    },
]
