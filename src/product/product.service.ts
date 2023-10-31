import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOperator, FindOptionsWhere, Repository } from 'typeorm';
import { FilterDoctorDto } from 'src/types/types';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>
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

	async findAll(page: number, limit: number) {
		if (page <= 0 || limit <= 0) {
			throw new Error(
				"Invalid 'page' and 'limit' values. Both 'page' and 'limit' must be greater than 0."
			);
		}

		const [products, total] = await this.productRepository.findAndCount({
			take: limit,
			skip: (page - 1) * limit,
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
		const query = this.productRepository.createQueryBuilder('product');

		if (brands && brands.length > 0) {
			query.andWhere('product.brand IN (:...brands)', { brands });
		}

		//work incorrect
		if (skinTypes && skinTypes.length > 0) {
			// if (skinTypes.length === 1) {
			// 	query.andWhere('product.skinType IN (:...skinTypes)', {
			// 		skinTypes,
			// 	});
			// } else {
			// 	query.andWhere('product.skinType = :skinTypes', {
			// 		skinTypes: skinTypes.join(','),
			// 	});
			// }

			query.andWhere(
				'product.skinType = ANY(ARRAY[:...skinTypes]::text[])',
				{
					skinTypes,
				}
			);
		}

		if (productTypes && productTypes.length > 0) {
			query.andWhere('product.productType IN (:...productTypes)', {
				productTypes,
			});
		}

		// const products = await this.productRepository.find({
		// 	where: {
		// 		brand: {
		// 			in: brands.join(","),
		// 		},
		// 		productType: {
		// 			in: productTypes,
		// 		},
		// 		skinType: {
		// 			_iLike: `%${skinTypes.join('|')}%`,
		// 		},
		// 	},
		// });
		return await query.getMany();
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
