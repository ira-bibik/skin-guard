import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	//@UseGuards(JwtAuthGuard)
	@Roles('admin')
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Get()
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 3
	) {
		return this.productService.findAll(+page, +limit);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(+id);
	}

	// @Get()
	// @UseGuards(JwtAuthGuard)
	// filter() {

	// }

	@Patch(':id')
	@Roles('admin')
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto
	) {
		return this.productService.update(+id, updateProductDto);
	}

	@Delete(':id')
	@Roles('admin')
	@UseGuards(RolesGuard)
	remove(@Param('id') id: string) {
		return this.productService.remove(+id);
	}
}
