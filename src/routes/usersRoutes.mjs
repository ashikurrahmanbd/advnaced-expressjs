import { Router } from "express";

import { users } from "../data/data.mjs";

const router = Router();


router.get('/users', (request, response) => {

    
    const { name } = request.query;
    
    if(name){

        const filteredUsers = users.filter(user => user.name === name.toLowerCase());

        return response.send(filteredUsers);

    }

    response.status(200).send(users);

});



/**
 * Route -> GET
 * return -> A single  user
 */
router.get('/users/:id', (request, response) => {

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
router.post('/users', (request, response) => {

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
router.put('/users/:id', (request, response) => {

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
router.patch('/users/:id', (request, response) => {

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
router.delete('/users/:id', (request, response) => {

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




export default router;