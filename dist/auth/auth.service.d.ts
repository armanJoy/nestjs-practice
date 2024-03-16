import { User } from './user.entity';
import UserRepository from './users.repository';
import { SingUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/singin.dto';
import { Token } from './dto/token.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    findUserByEmail(email: string): Promise<User>;
    signup(userDto: SingUpDto): Promise<User>;
    login(singinDto: SigninDto): Promise<Token>;
}
