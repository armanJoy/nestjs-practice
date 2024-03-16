import { Strategy } from 'passport-jwt';
import UserRepository from './users.repository';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepositiyr;
    constructor(userRepositiyr: UserRepository);
    validate(payload: any): Promise<string>;
}
export {};
