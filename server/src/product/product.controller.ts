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
	UseInterceptors,
	UploadedFile,
	ParseFilePipe,
	MaxFileSizeValidator,
	FileTypeValidator,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../user/guards/roles.guard';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRole } from '../types/types';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@Roles(UserRole.ADMIN)
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	@Post('upload/:id')
	@Roles(UserRole.ADMIN)
	@UseGuards(RolesGuard)
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile(new ParseFilePipe({
			validators: [
				 new MaxFileSizeValidator({ maxSize: 1000 }),
				 new FileTypeValidator({fileType: 'image/jpeg'})
			] }))
		file: Express.Multer.File,
		@Param('id') id: string
	) {
		return await this.productService.upload(file.originalname, file.buffer, id)
	}

	@Get()
	findAll(
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 9,
		@Query('s') s: string
	) {
		return this.productService.findAll(+page, +limit, s);
	}

	@Get('filter')
	filterProducts(
		@Query('brands') brands: string,
		@Query('skinTypes') skinTypes: string,
		@Query('productTypes') productTypes: string
	) {
		const brandsA = brands ? brands.split(',') : [];
		const productTypesA = productTypes ? productTypes.split(',') : [];
		const skinTypesA = skinTypes ? skinTypes.split(',') : [];
		return this.productService.filterProducts(
			brandsA,
			skinTypesA,
			productTypesA
		);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productService.findOne(+id);
	}

	@Patch(':id')
	@Roles(UserRole.ADMIN)
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	update(
		@Param('id') id: string,
		@Body() updateProductDto: UpdateProductDto
	) {
		return this.productService.update(+id, updateProductDto);
	}

	@Delete(':id')
	@Roles(UserRole.ADMIN)
	@UseGuards(RolesGuard)
	remove(@Param('id') id: string) {
		return this.productService.remove(+id);
	}
}
