"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.NotFoundError = exports.ApiError = void 0;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(statusCode, message) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.name = _this.constructor.name;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        if (message === void 0) { message = "Resource not found"; }
        return _super.call(this, 404, message) || this;
    }
    return NotFoundError;
}(ApiError));
exports.NotFoundError = NotFoundError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message) {
        if (message === void 0) { message = "Bad Request"; }
        return _super.call(this, 400, message) || this;
    }
    return BadRequestError;
}(ApiError));
exports.BadRequestError = BadRequestError;
