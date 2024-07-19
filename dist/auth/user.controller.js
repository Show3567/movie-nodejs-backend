"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var user_service_1 = require("./user.service");
var auth_middleware_1 = require("./middleware/auth.middleware");
var check_email_dto_1 = require("./dto/check-email.dto");
var signin_dto_1 = require("./dto/signin.dto");
var signup_dto_1 = require("./dto/signup.dto");
var update_user_dto_1 = require("./dto/update-user.dto");
var userRouters = express_1.default.Router();
// & ~~~~ passport local strategy;
// userRouters.route("/signin").post(
// 	passport.authenticate("local", {
// 		failureRedirect: "/api/v1/auth/login-failed",
// 		successRedirect: "/api/v1/auth/login-success",
// 	})
// );
// userRouters.route("/login-failed").get((req, res) => {
// 	res.send(`<h1>Login Failed!</h1>`);
// });
// userRouters.route("/login-success").get((req, res) => {
// 	res.send(`<h1>Login Success!</h1>`);
// });
// userRouters.post("/signup", signIn);
/**
 * @swagger
 * components:
 *   schemas:
 *     SignInCredentialsDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: 'user123'
 *         password:
 *           type: string
 *           example: 'password123'
 *     SignUpCredentialsDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: 'user123'
 *         password:
 *           type: string
 *           example: 'password123'
 *     CheckEmailDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: 'user@example.com'
 *     UpdateCredentialDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: 'user@example.com'
 *         password:
 *           type: string
 *           example: 'newpassword123'
 *     RefreshTokenDto:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *   responses:
 *     UnauthorizedError:
 *       description: Invalid credentials
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: 'Invalid credentials'
 */
/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInCredentialsDto'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
userRouters.route("/signin").post((0, auth_middleware_1.dtoCheck)(signin_dto_1.SignInCredentialsDto, function (errors) {
    return errors.map(function (error) {
        if (error.target && error.target.password) {
            delete error.target.password;
        }
        return error;
    });
}), user_service_1.signIn);
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpCredentialsDto'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRouters
    .route("/signup")
    .post((0, auth_middleware_1.dtoCheck)(signup_dto_1.SignUpCredentialsDto), user_service_1.signUp);
/**
 * @swagger
 * /api/v1/auth/check-email:
 *   post:
 *     summary: Check if email is available
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckEmailDto'
 *     responses:
 *       200:
 *         description: Email check successful
 *       400:
 *         description: Bad request
 */
userRouters
    .route("/check-email")
    .post((0, auth_middleware_1.dtoCheck)(check_email_dto_1.CheckEmailDto), user_service_1.checkEmail);
/**
 * @swagger
 * /api/v1/auth/userupdate:
 *   patch:
 *     summary: Update user credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCredentialDto'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
userRouters
    .route("/userupdate")
    .patch((0, auth_middleware_1.dtoCheck)(update_user_dto_1.UpdateCredentialDto), passport_1.default.authenticate("jwt", { session: false }), user_service_1.updateUser);
/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   get:
 *     summary: Refresh JWT token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
userRouters.route("/refresh-token").get(
// dtoCheck(RefreshTokenDto),
passport_1.default.authenticate("jwt_ign_exptime", { session: false }), user_service_1.refreshToken);
/**
 * @swagger
 * /api/v1/auth/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
userRouters
    .route("/users/:id")
    .delete(passport_1.default.authenticate("jwt", { session: false }), user_service_1.deleteUserById);
/**
 * @swagger
 * /api/v1/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: '1'
 *                   username:
 *                     type: string
 *                     example: 'user123'
 *                   email:
 *                     type: string
 *                     example: 'user@example.com'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
userRouters
    .route("/users")
    .get(passport_1.default.authenticate("jwt", { session: false }), user_service_1.getUsers);
exports.default = userRouters;
