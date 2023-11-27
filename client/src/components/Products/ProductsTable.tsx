import { FC, useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { IProductData, IProductsResponseData } from '../../types/types';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import {
	FormControl,
	Grid,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Pagination,
} from '@mui/material';
import './Products.css';
import { ProductService } from '../../services/ProductService';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

export const ProductsTable: FC = () => {
	const { products, totalPages } = useLoaderData() as IProductsResponseData;

	const [searchParams, setSearchParams] = useSearchParams();
	const [data, setData] = useState<IProductData[]>(products);
	const [currentPage, setCurrentPage] = useState<number>(
		parseInt(searchParams.get('page') || '1')
	);
	const [totalPages2, setTotalPages] = useState<number>(totalPages);
	const [searchValue, setSearchValue] = useState<string>('');

	useEffect(() => {
		fetchProducts(currentPage, searchValue);
	}, [currentPage]);

	const fetchProducts = async (page: number, search?: string) => {
		const data = await ProductService.getAllProducts(page, search);
		setData(data.products);
		setTotalPages(data.totalPages);
	};

	const handleChangePage = (e: any, page: number) => {
		changePage(page);
	};

	const changePage = (page: number) => {
		setSearchParams({ page: `${page}` });
		setCurrentPage(page);
	};

	const handleClickSearch = () => {
		if (currentPage !== 1) {
			changePage(1);
		}
		fetchProducts(1, searchValue);
	};

	const handleClickClear = () => {
		setSearchValue('');
	};

	return (
		<div className="productsGrid">
			<FormControl
				sx={{ alignSelf: 'flex-start', width: '500px' }}
				variant="standard"
			>
				<InputLabel htmlFor="search">Search</InputLabel>
				<Input
					id="search"
					type="text"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickSearch}
							>
								<SearchOutlinedIcon />
							</IconButton>
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickClear}
							>
								<ClearOutlinedIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			{data.length ? (
				<Grid container spacing={2}>
					{data.map((product) => (
						<Grid
							item
							key={product.productId}
							xs={12}
							sm={6}
							md={4}
						>
							<ProductCard product={product} />
						</Grid>
					))}
				</Grid>
			) : (
				<h1>Products are not found</h1>
			)}

			<Pagination
				color="primary"
				count={totalPages2}
				page={currentPage}
				onChange={handleChangePage}
				variant="outlined"
				shape="rounded"
			/>
		</div>
	);
};
