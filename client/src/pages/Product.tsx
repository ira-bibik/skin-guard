import { FC } from 'react';
import '../components/Products/Products.css';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IProductData, Role } from '../types/types';
import { IconButton, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useRole } from '../hooks/getRole';

const Product: FC = () => {
	const productData = useLoaderData() as IProductData;
	const navigate = useNavigate();
	const role = useRole();
	return (
		<div className="productConatiner">
			<img
				src={
					productData.photo ||
					'https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg'
				}
				alt="product photo"
				className="productPhoto"
			/>
			<div className="mainInfo">
				<Typography variant="h4">{productData.name}</Typography>
				<div className="mainInfoDoubleItem">
					<div>
						<h3>Product type:</h3>
						<p>{productData.productType || 'No data'}</p>
					</div>
					<div>
						<h3>Brand:</h3>
						<p>{productData.brand || 'No data'}</p>
					</div>
				</div>
				<div className="mainInfoDoubleItem">
					<div>
						<h3>Skin type:</h3>
						<p>{productData.skinType.join(', ') || 'No data'}</p>
					</div>
					<div>
						<h3>Amount:</h3>
						<p>{productData.amount || 'No data'}</p>
					</div>
				</div>
				<div>
					<h3>Ingredients:</h3>
					<p>{productData.ingredients || 'No data'}</p>
				</div>
				<div>
					<h3>Description:</h3>
					<p>{productData.description || 'No data'}</p>
				</div>
			</div>
			{role === Role.ADMIN && (
				<IconButton
					aria-label="edit product"
					onClick={() => navigate(`edit`)}
					className="editButton"
				>
					<EditOutlinedIcon />
				</IconButton>
			)}
		</div>
	);
};

export default Product;
