import { AuthService } from './auth.service';
import { SingUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { SigninDto } from './dto/singin.dto';
import { Token } from './dto/token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SingUpDto): Promise<User>;
    signin(singinDto: SigninDto): Promise<Token>;
}
