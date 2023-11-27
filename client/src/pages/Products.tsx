import { FC } from 'react';
import { ProductService } from '../services/ProductService';
import AddIcon from '@mui/icons-material/Add';
import { ProductsTable } from '../components/Products';
import { Fab } from '@mui/material';
import { useRole } from '../hooks/getRole';
import { Role } from '../types/types';

export const productsLoader = async () => {
	const data = await ProductService.getAllProducts();
	return data;
};

const Products: FC = () => {
	const role = useRole();
	return (
		<>
			<ProductsTable />
			{role === Role.ADMIN && (
				<Fab color="secondary" aria-label="add">
					<AddIcon />
				</Fab>
			)}
		</>
	);
};

export default Products;
