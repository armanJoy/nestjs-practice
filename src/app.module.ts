import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'joy1234',
            database: 'task_mgt',
            autoLoadEntities: true,
            synchronize: true,
        }),
        AuthModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule { }
