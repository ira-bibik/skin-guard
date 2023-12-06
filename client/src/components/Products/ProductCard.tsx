import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
} from '@mui/material';
import { IProductData, Role } from '../../types/types';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import { useRole } from '../../hooks/getRole';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

interface ProductCardProps {
	product: IProductData;
	setProductOutlet: (productId: IProductData) => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, setProductOutlet }) => {
	const navigate = useNavigate();
	const role = useRole();

	const handleCreateSchedule = () => {
		setProductOutlet(product);
		navigate('createSchedule');
	};

	return (
		<Card sx={{ width: 345 }}>
			<CardMedia
				component="img"
				alt={product.photo}
				height="250"
				image={product.photo}
				defaultValue="../../assets/images/notFoundImage.jpg"
			/>
			<CardContent sx={{ gap: '10px' }}>
				<Typography gutterBottom variant="h5" component="div">
					{product.name}
				</Typography>
				<div className="productCardContent">
					<Typography variant="body2" color="text.secondary">
						{product.brand}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{product.productType}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{product.amount}
					</Typography>
				</div>
				<Typography variant="body2" color="text.secondary">
					{product.skinType.join(', ')}
				</Typography>
			</CardContent>
			<CardActions className="cardActionButtons">
				<Button
					size="small"
					onClick={() => navigate(`${product.productId}`)}
				>
					Learn More
				</Button>
				<Box>
					{(role === Role.DOCTOR || role === Role.PATIENT) && (
						<IconButton
							aria-label="add to schedule"
							onClick={handleCreateSchedule}
						>
							<AddOutlinedIcon />
						</IconButton>
					)}
					{role === Role.ADMIN && (
						<>
							<IconButton aria-label="edit product">
								<EditOutlinedIcon />
							</IconButton>
							<IconButton aria-label="delete product">
								<DeleteOutlinedIcon />
							</IconButton>
						</>
					)}
				</Box>
			</CardActions>
		</Card>
	);
};
