import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Like, Repository } from 'typeorm';
import { FilterDoctorDto } from '../types/types';
import { UploadFilesService } from '../upload-files/upload-files.service';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>,
		private readonly uploadService: UploadFilesService
	) {}

	async create(createProductDto: CreateProductDto) {
		const isExist = await this.findOneByName(createProductDto.name);
		if (isExist)
			throw new BadRequestException('This product already exist');
		const dto: FilterDoctorDto = {};

		for (const key of [
			'name',
			'productType',
			'brand',
			'ingredients',
			'amount',
			'skinType',
			'description',
		]) {
			if (createProductDto[key]) {
				dto[key] = createProductDto[key];
			}
		}
		return await this.productRepository.save(dto);
	}

	async upload(fileName: string, file: Buffer, id: string) {
		const product = await this.findOneById(+id);
		const photoURL = await this.uploadService.uploadFile(fileName, file);
		await this.productRepository.update(id, { photo: photoURL });
		// return photoURL;
		return { ...product, photo: photoURL };
	}

	async findAll(page: number, limit: number, str: string) {
		if (page <= 0 || limit <= 0) {
			throw new BadRequestException(
				"Invalid 'page' and 'limit' values. Both 'page' and 'limit' must be greater than 0."
			);
		}

		const [products, total] = await this.productRepository.findAndCount({
			take: limit,
			skip: (page - 1) * limit,
			where: str && [
				{ name: Like(`%${str}%`) },
				{ productType: Like(`%${str}%`) },
				{ skinType: In([str]) },
			],
		});

		const totalPages = Math.ceil(total / limit);
		const currentPage = page;

		return { products, totalPages, currentPage };
	}

	async findOne(id: number) {
		const isExist = await this.findOneById(id);
		return isExist;
	}

	async update(id: number, updateProductDto: UpdateProductDto) {
		await this.findOneById(id);

		const dto: FilterDoctorDto = {};

		for (const key of [
			'name',
			'productType',
			'brand',
			'ingredients',
			'amount',
			'skinType',
			'description',
		]) {
			if (updateProductDto[key]) {
				dto[key] = updateProductDto[key];
			}
		}

		await this.productRepository.update(id, dto);
		return { message: 'Product was succesfully updated' };
	}

	async remove(id: number) {
		await this.findOneById(id);
		await this.productRepository.delete(id);
		return { message: 'Product was succesfully deleted' };
	}

	async filterProducts(
		brands?: string[],
		skinTypes?: string[],
		productTypes?: string[]
	) {
		const where: any = {};

		if (brands && brands.length > 0) {
			where.brand = In(brands);
		}

		if (productTypes && productTypes.length > 0) {
			where.productType = In(productTypes);
		}

		if (skinTypes && skinTypes.length > 0) {
			where.skinType = In(skinTypes);
		}

		const products = await this.productRepository.find({
			where,
		});

		return products;
	}

	async findOneByName(name: string) {
		const isExist = await this.productRepository.findOne({
			where: { name },
		});
		return isExist;
	}

	async findOneById(productId: number) {
		const isExist = await this.productRepository.findOne({
			where: { productId },
		});
		if (!isExist) throw new NotFoundException("This product doesn't exist");
		return isExist;
	}
}
