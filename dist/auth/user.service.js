"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUsers = exports.checkEmail = exports.refreshToken = exports.deleteUserById = exports.updateUser = exports.signUp = exports.signIn = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var typeorm_1 = require("typeorm");
var passport_util_1 = require("./passport-strategies/passport-util/passport-util");
var typeOrmConfig_1 = require("../core/typeOrmConfig");
var user_entity_1 = require("./entities/user.entity");
var user_role_enum_1 = require("./enum/user-role.enum");
require("../core/evnConfig");
var loggerConfig_1 = __importStar(require("../core/loggerConfig"));
var userRepo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.User);
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ private function;
var createToken = function (user) {
    var payload = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
    };
    var accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "", // privateKey
    { expiresIn: "1d", algorithm: "HS256" });
    return "Bearer ".concat(accessToken);
};
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signin;
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, accessToken;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userRepo.findOne({ where: { email: email } })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, passport_util_1.validPassword)(password, user.password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    accessToken = createToken(user);
                    loggerConfig_1.default.info((0, loggerConfig_1.loggerInfo)("signin", 201, { accessToken: accessToken, role: user.role }));
                    res.status(201).json({ accessToken: accessToken, role: user.role });
                }
                else {
                    loggerConfig_1.default.error((0, loggerConfig_1.loggerErr)("signin", 401, "Please check your login credentials"));
                    res
                        .status(401)
                        .json({ errMsg: "Please check your login credentials" });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signup;
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, email, role, user, _b, _c, userfromdb, accessToken;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, email = _a.email, role = _a.role;
                return [4 /*yield*/, userRepo.findOne({ where: { email: email } })];
            case 1:
                // 409: 'Conflict';
                if (!!(_e.sent())) {
                    loggerConfig_1.default.error((0, loggerConfig_1.loggerErr)("signup", 409, "User Already Exist. Please Login"));
                    res.status(409).send("User Already Exist. Please Login");
                }
                _c = (_b = userRepo).create;
                _d = {
                    username: username
                };
                return [4 /*yield*/, (0, passport_util_1.genPassword)(password)];
            case 2:
                user = _c.apply(_b, [(_d.password = (_e.sent()).hash,
                        _d.email = email,
                        _d.role = user_role_enum_1.UserRole[role] || user_role_enum_1.UserRole.USER,
                        _d)]);
                return [4 /*yield*/, userRepo.save(user)];
            case 3:
                _e.sent();
                return [4 /*yield*/, userRepo.findOne({
                        where: { email: email },
                    })];
            case 4:
                userfromdb = _e.sent();
                accessToken = userfromdb ? createToken(userfromdb) : "";
                loggerConfig_1.default.info((0, loggerConfig_1.loggerInfo)("signup", 201, { accessToken: accessToken, role: user.role }));
                res.status(201).json({ accessToken: accessToken, role: user.role });
                return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updateUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var role, userFromDB, accessToken;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                role = req.body.role;
                return [4 /*yield*/, userRepo.update({ email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email }, {
                        role: user_role_enum_1.UserRole[role],
                    })];
            case 1:
                _c.sent();
                return [4 /*yield*/, userRepo.findOne({
                        where: { email: (_b = req.user) === null || _b === void 0 ? void 0 : _b.email },
                    })];
            case 2:
                userFromDB = _c.sent();
                if (userFromDB) {
                    accessToken = createToken(userFromDB);
                    loggerConfig_1.default.info((0, loggerConfig_1.loggerInfo)("updateUser", 205, {
                        accessToken: accessToken,
                        role: userFromDB.role,
                    }));
                    res.status(205).json({ accessToken: accessToken, role: userFromDB.role });
                }
                else {
                    loggerConfig_1.default.error((0, loggerConfig_1.loggerErr)("updateUser", 401, "cannot update the User info"));
                    res.status(401).json(req.user);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
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
                    loggerConfig_1.default.error((0, loggerConfig_1.loggerErr)("deleteUserById", 404, "User which ID is \"".concat(id, "\" not found!")));
                    res.status(404).json({
                        message: "User which ID is \"".concat(id, "\" not found!"),
                    });
                }
                else if (userfromdb.role !== user_role_enum_1.UserRole.ADMIN) {
                    loggerConfig_1.default.error((0, loggerConfig_1.loggerErr)("updateUser", 401, "You don't have the permission to delete a user."));
                    res.status(401).json({
                        message: "You don't have the permission to delete a user.",
                    });
                }
                return [4 /*yield*/, userRepo.delete({ _id: new typeorm_1.ObjectId(id) })];
            case 2:
                _a.sent();
                loggerConfig_1.default.info((0, loggerConfig_1.loggerInfo)("updateUser", 201, { message: "success!" }));
                res.status(204);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteUserById = deleteUserById;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ refreshToken;
var refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, accessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.user && req.user.email)) return [3 /*break*/, 2];
                return [4 /*yield*/, userRepo.findOne({
                        where: { email: req.user.email },
                    })];
            case 1:
                user = _a.sent();
                if (user) {
                    accessToken = createToken(user);
                    loggerConfig_1.default.info((0, loggerConfig_1.loggerInfo)("refreshToken", 200, {
                        accessToken: accessToken,
                        role: user.role,
                    }));
                    res.status(200).json({ accessToken: accessToken, role: user.role });
                }
                else {
                    loggerConfig_1.default.error((0, loggerConfig_1.loggerErr)("refreshToken", 404, "Cannot find the user!"));
                    res.status(404).json({ message: "Cannot find the user!" });
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.refreshToken = refreshToken;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ checkEmail;
var checkEmail = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepo.findOne({
                        where: { email: req.body.email },
                    })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        loggerConfig_1.default.info((0, loggerConfig_1.loggerInfo)("checkEmail", 200, { hasUser: true }));
                        res.status(200).send(true);
                    }
                    else {
                        loggerConfig_1.default.info((0, loggerConfig_1.loggerInfo)("checkEmail", 200, { hasUser: false }));
                        res.status(200).send(false);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.checkEmail = checkEmail;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userRepo.find()];
            case 1:
                users = _a.sent();
                loggerConfig_1.default.info((0, loggerConfig_1.loggerInfo)("getUsers", 200, users));
                res.status(200).json(users);
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
