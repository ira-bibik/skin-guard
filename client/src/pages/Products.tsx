import { FC } from 'react';
import { ProductService } from '../services/ProductService';
import AddIcon from '@mui/icons-material/Add';
import { ProductsTable } from '../components/Products';
import { Fab } from '@mui/material';
import { useRole } from '../hooks/getRole';
import { Role } from '../types/types';
import { useNavigate } from 'react-router-dom';

export const productsLoader = async () => {
	const data = await ProductService.getAllProducts();
	return data;
};

const Products: FC = () => {
	const role = useRole();
	const navigate = useNavigate();
	return (
		<>
			<ProductsTable />
			{role === Role.ADMIN && (
				<Fab
					color="secondary"
					aria-label="add"
					onClick={() => navigate('create')}
				>
					<AddIcon />
				</Fab>
			)}
		</>
	);
};

export default Products;
