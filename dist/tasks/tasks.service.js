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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_enum_1 = require("./task.enum");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./task.entity");
const task_repository_1 = require("./task.repository");
const alltask_response_dto_1 = require("./dto/alltask.response.dto");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getAllTasks(userId, limit, page) {
        const skip = (limit - 1) * page;
        const [tasks, total] = await this.taskRepository.findAndCount({
            where: { user: userId },
            order: { createdAt: 'DESC' },
            take: page,
            skip: skip,
        });
        const result = new alltask_response_dto_1.AllTaskResponse(tasks, total);
        return result;
    }
    async createTask(createTaskDto, userId) {
        const { title, description } = createTaskDto;
        return await this.taskRepository.save({
            title,
            description,
            status: task_enum_1.TaskStatus.OPEN,
            user: userId,
        });
    }
    async getTaskById(id, userId) {
        try {
            const task = await this.taskRepository.findOne({
                where: {
                    id: id,
                    user: userId,
                },
            });
            console.log(task);
            if (!task) {
                throw new common_1.NotFoundException();
            }
            const taskUserId = task.user;
            if (userId !== taskUserId) {
                throw new common_1.UnauthorizedException();
            }
            return task;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException(error);
        }
    }
    async updateTaskStatus(id, updateDto) {
        try {
            if (!updateDto.title && !updateDto.status) {
                throw new common_1.BadRequestException();
            }
            const task = await this.taskRepository.findOneBy({ id });
            if (!task) {
                throw new common_1.BadRequestException();
            }
            if (updateDto.title && updateDto.status) {
                (task.title = updateDto.title), (task.status = updateDto.status);
            }
            else if (updateDto.title) {
                task.title = updateDto.title;
            }
            else if (updateDto.status) {
                task.status = updateDto.status;
            }
            return await this.taskRepository.save(task);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteTaskById(id, userId) {
        const task = await this.taskRepository.findOne({
            where: { id: id, user: userId },
        });
        if (!task) {
            throw new common_1.BadRequestException();
        }
        await this.taskRepository.remove(task);
        return 'success';
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [task_repository_1.default])
], TasksService);
//# sourceMappingURL=tasks.service.js.map