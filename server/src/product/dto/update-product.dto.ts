import { IsArray, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

export class UpdateProductDto {
	@IsOptional()
	@IsString({ message: 'Name must be a string' })
	@Length(3, 100, {
		message:
			'Name must be not less than 3 characters and not bigger than 100 characters',
	})
	readonly name: string;

	@IsOptional()
	@IsString({ message: 'Product type must be a string' })
	@Length(3, 50, {
		message:
			'Product type must be not less than 3 characters and not bigger than 50 characters',
	})
	readonly productType: string;

	@IsOptional()
	@IsString({ message: 'Brand must be a string' })
	@Length(3, 50, {
		message:
			'Brand must be not less than 3 characters and not bigger than 50 characters',
	})
	readonly brand: string;

	@IsOptional()
	@IsString({ message: 'Ingredients must be a string' })
	@Length(5, 1000, {
		message:
			'Ingredients must be not less than 5 characters and not bigger than 1000 characters',
	})
	readonly ingredients: string;

	@IsOptional()
	@IsString({ message: 'Amount must be an array of strings' })
	@Length(2, 10, {
		message:
			'Amount must be not less than 2 characters and not bigger than 10 characters',
	})
	readonly amount: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	// @MinLength(1, {
	// 	message: 'Skin type must include at least 1 item',
	// })
	readonly skinType: string[];

	@IsOptional()
	@IsString({ message: 'Description must be a string' })
	@MaxLength(100, {
		message: 'Max length should be less than 1000 characters',
	})
	readonly description?: string;
}
