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
exports.SignUpCredentialsDto = void 0;
// import { ApiProperty } from '@nestjs/swagger';
var class_validator_1 = require("class-validator");
var user_role_enum_1 = require("../enum/user-role.enum");
var SignUpCredentialsDto = /** @class */ (function () {
    function SignUpCredentialsDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.MaxLength)(10),
        __metadata("design:type", String)
    ], SignUpCredentialsDto.prototype, "username", void 0);
    __decorate([
        (0, class_validator_1.IsString)()
        // @MinLength(4)
        // @MaxLength(10)
        // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        //   message: 'password is too week!',
        // })
        ,
        __metadata("design:type", String)
    ], SignUpCredentialsDto.prototype, "password", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], SignUpCredentialsDto.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
        __metadata("design:type", String)
    ], SignUpCredentialsDto.prototype, "role", void 0);
    return SignUpCredentialsDto;
}());
exports.SignUpCredentialsDto = SignUpCredentialsDto;
/**
    Passwords will contain at least 1 upper case letter
    Passwords will contain at least 1 lower case letter
    Passwords will contain at least 1 number or special character
    There is no length validation (min, max) in this regex!

    Regular expression for JavaScript:
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
 */
