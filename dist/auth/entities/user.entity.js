"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var user_role_enum_1 = require("../enum/user-role.enum");
var User = /** @class */ (function () {
    function User() {
    }
    // Add method to validate password
    User.prototype.validatePassword = function (password) {
        // Implement your password validation logic here
        // For simplicity, let's assume passwords are stored in plain text (which is not recommended in production)
        return this.password === password;
    };
    __decorate([
        (0, typeorm_1.ObjectIdColumn)() // for mongodb;
        ,
        __metadata("design:type", Object)
    ], User.prototype, "_id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: user_role_enum_1.UserRole,
            default: user_role_enum_1.UserRole.USER,
        }),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)("user")
    ], User);
    return User;
}());
exports.User = User;
