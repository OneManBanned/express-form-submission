import usersStorage from "../storage/usersStorage.js";
import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 characters";

const validateUser = [
    body("firstName")
        .trim()
        .isAlpha()
        .withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 10 })
        .withMessage(`First name ${lengthErr}`),
    body("lastName")
        .trim()
        .isAlpha()
        .withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 })
        .withMessage(`Last name ${lengthErr}`),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Email address must be valid")
        .notEmpty()
        .withMessage("Email is required"),
    body("age")
        .trim()
        .isInt({ gt: 17, lt: 121, allow_leading_zeroes: false })
        .withMessage("Age must be a number between 18 and 120")
        .optional(),
    body("bio")
        .trim()
        .isLength({ max: 200 })
        .withMessage("Bio must be less than 200 characters")
        .optional(),
];

const usersListGet = (req, res) => {
    res.render("index", {
        title: "User List",
        users: usersStorage.getUsers(),
    });
};

const usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: "Create user",
    });
};

const usersCreatePost = [
    validateUser,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createUser", {
                title: "Create user",
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, age, bio } = req.body;
        usersStorage.addUser({ firstName, lastName, email, age, bio });
        res.redirect("/");
    },
];

const usersUpdateGet = (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    res.render("updateUser", {
        title: "Update user",
        user: user,
    });
};

const usersUpdatePost = [
    validateUser,
    (req, res) => {
        const user = usersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update user",
                user: user,
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, age, bio } = req.body;
        console.log(req.body);
        usersStorage.updateUser(req.params.id, {
            firstName,
            lastName,
            email,
            age,
            bio,
        });
        res.redirect("/");
    },
];

const usersDeletePost = (req, res) => {
    usersStorage.deleteUser(req.params.id);
    res.redirect("/");
};

const searchUsersGet = (req, res) => {
    const users = usersStorage.getUsers();
    const user = users.filter(u => u.email === req.query.email)
    res.render("searchUser", {
        user: user[0],
    });
};

export {
    usersListGet,
    searchUsersGet,
    usersCreateGet,
    usersCreatePost,
    usersUpdatePost,
    usersUpdateGet,
    usersDeletePost,
};
