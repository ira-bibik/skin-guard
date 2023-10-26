import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>
	) { }
	
	async create(createProductDto: CreateProductDto) {
		const isExist = await this.findOneByName(createProductDto.name);
		if (isExist)
			throw new BadRequestException('This product already exist');
		return await this.productRepository.save(createProductDto);
	}

	async findAll(page, limit) {
		return await this.productRepository.find({
			take: limit,
			skip: (page - 1) * limit,
		});
	}

	async findOne(id: number) {
		const isExist = await this.findOneById(id);
		return isExist;
	}

	async update(id: number, updateProductDto: UpdateProductDto) {
		await this.findOneById(id);
		await this.productRepository.update(id, updateProductDto);
		return { message: 'Product was succesfully updated' };
	}

	async remove(id: number) {
		await this.findOneById(id);
		await this.productRepository.delete(id);
		return { message: 'Product was succesfully deleted' };
	}

	async filterProducts(filters: {
		brands?: string[];
		productTypes?: string[];
		skinTypes?: string[];
	}) {
		const query = this.productRepository.createQueryBuilder('product');

		if (filters.brands && filters.brands.length > 0) {
			query.andWhere('product.brand IN (:...brands)', {
				brands: filters.brands,
			});
		}

		if (filters.productTypes && filters.productTypes.length > 0) {
			query.andWhere('product.productType IN (:...productTypes)', {
				productTypes: filters.productTypes,
			});
		}

    if (filters.skinTypes && filters.skinTypes.length > 0) {
      // тут помилка
			query.andWhere(
				'ARRAY[:...skinTypes]::text[] && product.skinType',
				{
					skinTypes: filters.skinTypes,
				}
      );
      //
		}

		return query.getMany();
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
