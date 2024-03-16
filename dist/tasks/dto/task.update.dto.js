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
exports.TaskUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const task_enum_1 = require("../task.enum");
class TaskUpdateDto {
}
exports.TaskUpdateDto = TaskUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TaskUpdateDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [task_enum_1.TaskStatus] }),
    __metadata("design:type", String)
], TaskUpdateDto.prototype, "status", void 0);
//# sourceMappingURL=task.update.dto.js.map