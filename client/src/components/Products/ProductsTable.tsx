import { FC, useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { IProductData, IProductsResponseData } from '../../types/types';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { Grid, Pagination } from '@mui/material';
import './Products.css';
import { ProductService } from '../../services/ProductService';

export const ProductsTable: FC = () => {
	const { products, totalPages } = useLoaderData() as IProductsResponseData;

	const [searchParams, setSearchParams] = useSearchParams();
	const [data, setData] = useState<IProductData[]>(products);
	const [currentPage, setCurrentPage] = useState<number>(
		parseInt(searchParams.get('page') || '1')
	);

	useEffect(() => {
		fetchProducts(currentPage);
	}, [currentPage]);

	const fetchProducts = async (page: number) => {
		const data = await ProductService.getAllProducts(page);
		setData(data.products);
	};

	const changePage = (e: any, page: number) => {
		setSearchParams({ page: `${page}` });
		setCurrentPage(page);
	};

	return (
		<div className="productsGrid">
			<Grid container spacing={2}>
				{data.map((product) => (
					<Grid item key={product.productId} xs={12} sm={6} md={4}>
						<ProductCard product={product} />
					</Grid>
				))}
			</Grid>
			<Pagination
				color="primary"
				count={totalPages}
				page={currentPage}
				onChange={changePage}
				variant="outlined"
				shape="rounded"
			/>
		</div>
	);
};
