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
exports.signUp = exports.signin = void 0;
var verifyIdentitiy_1 = require("../auth/cryptography/verifyIdentitiy");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_entity_1 = require("../auth/entities/user.entity");
var typeOrmConfig_1 = require("../core/typeOrmConfig");
var passport_util_1 = require("../auth/passport-strategies/passport-util/passport-util");
var loggerConfig_1 = __importStar(require("../core/loggerConfig"));
var user_role_enum_1 = require("../auth/enum/user-role.enum");
var userRepo = typeOrmConfig_1.AppDataSource.getRepository(user_entity_1.User);
var _a = (0, verifyIdentitiy_1.getKey)("priv"), key = _a.key, algorithm = _a.algorithm;
var createToken = function (user) {
    var payload = {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
    };
    var accessToken = jsonwebtoken_1.default.sign(payload, key, {
        expiresIn: "1d",
        algorithm: algorithm,
    });
    return "Bearer ".concat(accessToken);
};
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
exports.signin = signin;
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
