import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UserRole } from '../src/types/types';

describe('App e2e', () => {
	let app: INestApplication;
	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleRef.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
		await app.init();
		await app.listen(3333);
		pactum.request.setBaseUrl('http://localhost:3333');
	});

	afterAll(() => {
		app.close();
    });
    
    describe('Auth', () => {
		const dto: CreateUserDto = {
			email: 'ira@gmail.com',
			password: '123456',
			role: UserRole.DOCTOR,
		};
		describe('Signup', () => {
			// it('should throw if email empty', () => {
			// 	return pactum
			// 		.spec()
			// 		.post('/users/register')
			// 		.withBody({
			// 			password: dto.password,
			// 		})
			// 		.expectStatus(400);
			// });

			// it('should throw if password empty', () => {
			// 	return pactum
			// 		.spec()
			// 		.post('/users/register')
			// 		.withBody({
			// 			email: dto.email,
			// 		})
			// 		.expectStatus(400);
			// });

			// it('should throw if no body provided', () => {
			// 	return pactum
			// 		.spec()
			// 		.post('/auth/signup')
			// 		.withBody({})
			// 		.expectStatus(404);
			// });

			it('should signup', () => {
				return pactum
					.spec()
					.post('/users/register')
					.withBody(dto)
					.expectStatus(201);
			});
		});

		// describe('Signin', () => {
		// 	it('should throw if email empty', () => {
		// 		return pactum
		// 			.spec()
		// 			.post('/auth/signin')
		// 			.withBody({
		// 				password: dto.password,
        //             })
 
		// 			.expectStatus(400);
		// 	});

		// 	it('should throw if password empty', () => {
		// 		return pactum
		// 			.spec()
		// 			.post('/auth/signin')
		// 			.withBody({
		// 				email: dto.email,
		// 			})
		// 			.expectStatus(400);
		// 	});

		// 	it('should throw if no body provided', () => {
		// 		return pactum
		// 			.spec()
		// 			.post('/auth/signin')
		// 			.withBody({})
		// 			.expectStatus(400);
		// 	});

		// 	it('should signin', () => {
		// 		return pactum
		// 			.spec()
		// 			.post('/auth/signin')
		// 			.withBody(dto)
		// 			.expectStatus(200)
		// 			.stores('userAt', 'access_token');
		// 	});
		// });
	});
});
