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
exports.UpdateCredentialDto = void 0;
// import { ApiProperty } from '@nestjs/swagger';
var class_validator_1 = require("class-validator");
var user_role_enum_1 = require("../enum/user-role.enum");
var UpdateCredentialDto = /** @class */ (function () {
    function UpdateCredentialDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.MaxLength)(10),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateCredentialDto.prototype, "username", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
        // @MinLength(4)
        // @MaxLength(10)
        // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        //   message: 'password is too week!',
        // })
        ,
        __metadata("design:type", String)
    ], UpdateCredentialDto.prototype, "password", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateCredentialDto.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", String)
    ], UpdateCredentialDto.prototype, "role", void 0);
    return UpdateCredentialDto;
}());
exports.UpdateCredentialDto = UpdateCredentialDto;
