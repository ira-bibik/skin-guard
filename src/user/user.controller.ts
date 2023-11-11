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
	Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { UserRole } from '../types/types';

@Controller('users')
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

	@Get()
	@Roles(UserRole.ADMIN)
	@UseGuards(RolesGuard)
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 9
	) {
		return this.userService.findAll(+page, +limit);
	}

	//profile(getMe) it's not neccessary
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}

	@Get('/:userId')
	@Roles(UserRole.ADMIN)
	@UseGuards(RolesGuard)
	findOneByUserId(@Param('userId') id: string) {
		return this.userService.findOneByUserId(+id);
	}

	@Delete(':id')
	@Roles(UserRole.ADMIN)
	@UseGuards(RolesGuard)
	remove(@Param('id') userId: string) {
		return this.userService.remove(+userId);
	}
}
