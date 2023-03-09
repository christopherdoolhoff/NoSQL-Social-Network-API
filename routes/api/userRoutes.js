const router = require('express').Router();

const {
    getAllUser,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/UserController');


// route to GET all users and route to POST (create) a new user
router.route('/').get(getAllUser).post(createUser);

// route to GET a single user by its _id and populated thought and friend data, route to PUT (update) a user by its _id, and route to DELETE a user by its _id
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

// route to Post (add) a new friend to a user's friend list and route to DELETE a friend from a user's friend list
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


