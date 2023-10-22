import {
	Controller,
	Get,
	Post,
	Request,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/login')
	@UseGuards(LocalAuthGuard)
	async login(@Request() req) {
		return this.userService.login(req.user);
	}

	@Post('/register')
	@UsePipes(new ValidationPipe())
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	//profile(getMe) it's not neccessary
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	// rolesGuard for admin
	@Delete(':id')
	remove(@Param('id') userId: string) {
		return this.userService.remove(+userId);
	}
}
