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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const task_input_dto_1 = require("./dto/task.input.dto");
const task_entity_1 = require("./task.entity");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const alltask_response_dto_1 = require("./dto/alltask.response.dto");
const task_update_dto_1 = require("./dto/task.update.dto");
const Util_1 = require("../util/Util");
let TasksController = class TasksController {
    constructor(taskservie) {
        this.taskservie = taskservie;
    }
    getAllTasks(req, page, limit) {
        console.log(page, limit);
        limit = limit || 10;
        page = page || 1;
        return this.taskservie.getAllTasks(req.user, page, limit);
    }
    async getTaskById(req, id) {
        if (!Util_1.Util.isValidUuuid(id)) {
            throw new common_1.BadRequestException();
        }
        return this.taskservie.getTaskById(id, req.user);
    }
    async createTask(req, createTaskDto) {
        const userId = req.user;
        console.log(userId);
        return await this.taskservie.createTask(createTaskDto, userId);
    }
    updateTaskStatus(req, id, updateDto) {
        if (!Util_1.Util.isValidUuuid(id)) {
            throw new common_1.BadRequestException();
        }
        return this.taskservie.updateTaskStatus(id, updateDto);
    }
    deleteTaskById(req, id) {
        const userId = req.user;
        if (!Util_1.Util.isValidUuuid(id)) {
            throw new common_1.BadRequestException();
        }
        return this.taskservie.deleteTaskById(id, userId);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, example: 10 }),
    (0, swagger_1.ApiOkResponse)({ type: alltask_response_dto_1.AllTaskResponse }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiBody)({ type: task_entity_1.Task }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: task_input_dto_1.CreateTaskDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Created', type: task_entity_1.Task }),
    (0, swagger_1.ApiForbiddenResponse)({ type: rxjs_1.NotFoundError }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, task_input_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiBody)({ type: task_update_dto_1.TaskUpdateDto }),
    (0, swagger_1.ApiOkResponse)({ type: task_entity_1.Task }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, task_update_dto_1.TaskUpdateDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTaskStatus", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOkResponse)({ type: String }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTaskById", null);
exports.TasksController = TasksController = __decorate([
    (0, swagger_1.ApiTags)('Task'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map