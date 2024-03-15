"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var typeorm_1 = require("typeorm");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var dotenv_1 = __importDefault(require("dotenv"));
var passport_1 = __importDefault(require("passport"));
var typeOrmConfig_1 = require("../core/typeOrmConfig");
var user_entity_1 = require("./entities/user.entity");
var user_role_enum_1 = require("./enum/user-role.enum");
var passport_util_1 = require("./passport-strategies/passport-util/passport-util");
var signin_dto_1 = require("./dto/signin.dto");
dotenv_1.default.config();
var userRouters = express_1.default.Router();
var userRepo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.User);
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ private function;
var createToken = function (user) {
    var payload = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        tmdb_key: user.tmdb_key,
    };
    var accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1d", algorithm: "HS256" });
    return "Bearer ".concat(accessToken);
};
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signin;
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var signinDto, errors, filteredErrors, _a, email, password, user, _b, accessToken, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                signinDto = (0, class_transformer_1.plainToInstance)(signin_dto_1.SignInCredentialsDto, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(signinDto)];
            case 1:
                errors = _c.sent();
                if (errors.length > 0) {
                    filteredErrors = errors.map(function (error) {
                        if (error.target && error.target.password) {
                            delete error.target.password;
                        }
                        return error;
                    });
                    res.status(400).json(filteredErrors);
                }
                _c.label = 2;
            case 2:
                _c.trys.push([2, 6, , 7]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userRepo.findOne({ where: { email: email } })];
            case 3:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, passport_util_1.validPassword)(password, user.password)];
            case 4:
                _b = (_c.sent());
                _c.label = 5;
            case 5:
                if (_b) {
                    accessToken = createToken(user);
                    res.status(201).json({ accessToken: accessToken, role: user.role });
                }
                else {
                    res
                        .status(401)
                        .json({ errMsg: "Please check your login credentials" });
                }
                return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                res.status(500).json({ message: "Internal Server Error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signup;
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, tmdb_key, role, user, _b, _c, userfromdb, accessToken, err_1;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, email = _a.email, tmdb_key = _a.tmdb_key, role = _a.role;
                // 400: 'Bad Request';
                if (!(email && password))
                    res.status(400).send("All input are required!");
                return [4 /*yield*/, userRepo.findOne({ where: { email: email } })];
            case 1:
                // 409: 'Conflict';
                if (!!(_e.sent()))
                    res.status(409).send("User Already Exist. Please Login");
                _c = (_b = userRepo).create;
                _d = {
                    username: username
                };
                return [4 /*yield*/, (0, passport_util_1.genPassword)(password)];
            case 2:
                user = _c.apply(_b, [(_d.password = (_e.sent()).hash,
                        _d.email = email,
                        _d.tmdb_key = tmdb_key,
                        _d.role = user_role_enum_1.UserRole[role] || user_role_enum_1.UserRole.USER,
                        _d)]);
                _e.label = 3;
            case 3:
                _e.trys.push([3, 6, , 7]);
                return [4 /*yield*/, userRepo.save(user)];
            case 4:
                _e.sent();
                return [4 /*yield*/, userRepo.findOne({
                        where: { email: email },
                    })];
            case 5:
                userfromdb = _e.sent();
                accessToken = userfromdb ? createToken(userfromdb) : "";
                res.status(201).json({ accessToken: accessToken, role: user.role });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _e.sent();
                if (err_1.code === "11000") {
                    res.status(409).send("Username already exists");
                }
                else {
                    res.status(500);
                }
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updateUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var role, userFromDB, accessToken, error_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.log("user: ", req.body.role, (_a = req.user) === null || _a === void 0 ? void 0 : _a.email);
                role = req.body.role;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userRepo.update({ email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.email }, {
                        role: user_role_enum_1.UserRole[role],
                    })];
            case 2:
                _d.sent();
                return [4 /*yield*/, userRepo.findOne({
                        where: { email: (_c = req.user) === null || _c === void 0 ? void 0 : _c.email },
                    })];
            case 3:
                userFromDB = _d.sent();
                if (userFromDB) {
                    console.log(userFromDB);
                    accessToken = createToken(userFromDB);
                    res.status(205).json({ accessToken: accessToken, role: userFromDB.role });
                }
                else {
                    res.status(201).json(req.user);
                }
                return [3 /*break*/, 5];
            case 4:
                error_2 = _d.sent();
                res.status(500).json({ err: JSON.stringify(error_2) });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ deleteUserById;
var deleteUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userfromdb;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, userRepo.findOne({
                        where: { _id: new typeorm_1.ObjectId(id) },
                    })];
            case 1:
                userfromdb = _a.sent();
                if (!userfromdb) {
                    res.status(404).json({
                        message: "User which ID is \"".concat(id, "\" not found!"),
                    });
                }
                else if (userfromdb.role !== user_role_enum_1.UserRole.ADMIN)
                    res.status(401).json({
                        message: "You don't have the permission to delete a user.",
                    });
                return [4 /*yield*/, userRepo.delete({ _id: new typeorm_1.ObjectId(id) })];
            case 2:
                _a.sent();
                res.status(204);
                return [2 /*return*/];
        }
    });
}); };
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ refreshToken;
var refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, userRepo.findOne({ where: { email: email } })];
            case 1:
                user = _a.sent();
                if (user) {
                    accessToken = createToken(user);
                    res.status(201).json({ accessToken: accessToken, role: user.role });
                }
                else {
                    res
                        .status(201)
                        .json({ message: "Please complete your user info" });
                }
                return [2 /*return*/];
        }
    });
}); };
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ checkEmail;
var checkEmail = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(req.session);
                    return [4 /*yield*/, userRepo.findOne({
                            where: { email: req.body.email },
                        })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        res.status(200).send(true);
                    }
                    else {
                        res.status(200).send(false);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userRepo.find()];
            case 1:
                users = _a.sent();
                res.status(200).json(users);
                return [2 /*return*/];
        }
    });
}); };
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Router;
userRouters
    .route("/users")
    .get(passport_1.default.authenticate("jwt", { session: false }), getUsers);
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
userRouters.route("/signin").post(signIn);
userRouters.route("/signup").post(signUp);
userRouters.route("/check-email").post(checkEmail);
userRouters
    .route("/userupdate")
    .patch(passport_1.default.authenticate("jwt", { session: false }), updateUser);
userRouters
    .route("/refresh-token")
    .post(passport_1.default.authenticate("jwt", { session: false }), refreshToken);
userRouters
    .route("/users/:id")
    .delete(passport_1.default.authenticate("jwt", { session: false }), deleteUserById);
exports.default = userRouters;
