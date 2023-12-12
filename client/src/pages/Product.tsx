import { FC, useState } from 'react';
import '../components/Products/Products.css';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { IProductData, Role } from '../types/types';
import { IconButton, Tooltip, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useRole } from '../hooks/getRole';
import { getRole } from '../helper/getRole.helper';
import { ProductService } from '../services/ProductService';
import { toast } from 'react-toastify';

const Product: FC = () => {
	const productData = useLoaderData() as IProductData;
	const navigate = useNavigate();
	const role = useRole();
	const [productPhoto, setProductPhoto] = useState(productData.photo);

	const getFileFromUser = async (userFile: any) => {
		try {
			const role = getRole();
			if (userFile.target.files.length && role) {
				const data = await ProductService.uploadPhoto(
					userFile.target.files[0],
					productData.productId
				);
				setProductPhoto(data.photo);
				toast.success('The photo is uploaded');
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	return (
		<div className="productConatiner">
			<div className="photoBlock">
				<img
					src={
						productPhoto ||
						'https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg'
					}
					alt="product photo"
					className="productPhoto"
				/>
				{role === Role.ADMIN && (
					<Tooltip title={`Change photo`}>
						<label htmlFor="productPhoto" className="photoInput">
							<input
								id="productPhoto"
								type={'file'}
								onChange={(file) => getFileFromUser(file)}
								style={{ display: 'none' }}
							/>
							<EditOutlinedIcon />
						</label>
					</Tooltip>
				)}
			</div>
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
