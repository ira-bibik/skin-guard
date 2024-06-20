import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateProductDto {
	@IsNotEmpty({ message: 'Name should not be empty' })
	@IsString({ message: 'Name must be a string' })
	@MaxLength(100, {
		message: 'Name must be not bigger than 100 characters',
	})
	readonly name?: string;

	@IsNotEmpty({ message: 'Product type should not be empty' })
	@IsString({ message: 'Product type must be a string' })
	readonly productType?: string;

	@IsNotEmpty({ message: 'Brand should not be empty' })
	@IsString({ message: 'Brand must be a string' })
	readonly brand?: string;

	@IsNotEmpty({ message: 'Ingredients should not be empty' })
	@IsString({ message: 'Ingredients must be a string' })
	@MaxLength(1000, {
		message: 'Ingredients must be not bigger than 1000 characters',
	})
	readonly ingredients?: string;

	@IsNotEmpty({ message: 'Amount should not be empty' })
	@IsString({ message: 'Amount must be an array of strings' })
	readonly amount?: string;

	@IsNotEmpty({ message: 'Skin types should not be empty' })
	@IsArray()
	@IsString({ each: true })
	// @MinLength(1, {
	// 	message:
	// 		'Skin type must include at least 1 item',
	// })
	readonly skinType?: string[];

	@IsOptional()
	@IsString({ message: 'Description must be a string' })
	@MaxLength(1000, {
		message: 'Max length should be less than 1000 characters',
	})
	readonly description?: string;
}
