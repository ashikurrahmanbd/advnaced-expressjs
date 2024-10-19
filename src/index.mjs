import express from 'express';

const app = express();

//allowing the express to take data from the body
app.use(express.json());

const PORT = process.env.PORT || 3000;

const users = [
    {
        id: 1,
        name: "ashik",
        age: 29
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

/**
 * we can use any middleware before routing start. A middle is just a extra layer to take a actin agains a route. it has the request, response and next method. if we apply next it goes for next middlewarre that can be a route action as well.
 */

/**
 * A simlpe middleware
 * 
 * remember that response.send() it ends the request response cycle and send a response to the click
 */

const checkNetworkProtocal = (request, response, next) => {

    if(request.protocol === 'https'){

        response.send("you are from https");
       
    }else{
        
        next();    
        
    }
     
}


/**
 * A simple Get Route  with a middleware
*/
app.get('/', checkNetworkProtocal, (request, response) => {

    response.send("Welcmoe to Express");

});

/**
 * Get All the Users
*/
app.get('/api/users', (request, response) => {

    
    const { name } = request.query;
    
    if(name){

        const filteredUsers = users.filter(user => user.name === name.toLowerCase());

        return response.send(filteredUsers);

    }

    response.status(200).send(users);

});

/**
 * Get A single User
*/
app.get('/api/users/:id', (request, response) => {

    const { id } = request.params;

    //what we  get as a string from the urlbar should be converted into int to 
    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return response.send({msg: 'Invalid Id'});

    const filteredUser = users.find((user) => {
        return user.id === parsedId;
    });

    if(!filteredUser) return response.status(404).send({msg: "User not Found"});

    return response.send(filteredUser);


});

/**
 * Post Method -> as we don't have the db yet so we will push a new object to the users array on this route
*/
app.post('/api/users', (request, response) => {

    //just to get the max user id
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);

    const newUser = {
        id: maxId + 1,
        ...request.body
    };

    users.push(newUser); //virtually added new item to our users array

    response.status(200).send(newUser);

});

/**
 * PUT -> it will update the entire data not a portion
 */
app.put('/api/users/:id', (request, response) => {

    const { body, params : {id} } = request;

    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return response.send({msg: "inValid ID"});

    const findUserIndex = users.findIndex((user) => {
        return user.id === parsedId;
    });

    if(findUserIndex === -1) return response.status(404).send({msg: "User not found"});

    //now update the user
    users[findUserIndex] = {

        id: parsedId,
        ...body

    };

    // return response.send({msg: "user has been updated"});
    return response.send({msg: "User Updated"})
});


/**
 * PATCH -> partial Update  to any record
 */
app.patch('/api/users/:id', (request, response) => {

    const { body, params : {id} } = request;

    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return response.send({msg: "inValid ID"});

    const findUserIndex = users.findIndex((user) => {
        return user.id === parsedId;
    });

    if(findUserIndex === -1) return response.status(404).send({msg: "User not found"});

    //now update the user
    users[findUserIndex] = {

        ...users[findUserIndex],
        ...body

    };

    // return response.send({msg: "user has been updated"});
    return response.send({msg: "User Updated"})

});

/**
 * Delete
 */
app.delete('/api/users/:id', (request, response) => {

    const { params : {id} } = request;

    const parsedId = parseInt(id);


    if(isNaN(parsedId)){
        return response.sendStatus(400)
    }

    const findUserIndex = users.findIndex(user => user.id === parsedId);

    if(findUserIndex === -1){
        return response.sendStatus(404);
    }

    //now delete start splice tke two argument(index, howmayItemWeNeedToDelete)
    users.splice(findUserIndex, 1);

    return response.send({msg: "user deleted"});

})


app.listen(PORT, () => {
    console.log("The Server is Running at "+PORT);
})

