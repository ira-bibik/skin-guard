import { FC, useState } from 'react';
import './Profile.css';
import { IconButton, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { toast } from 'react-toastify';
import { getRole } from '../../helper/getRole.helper';
import { AuthService } from '../../services/AuthService';
// import defaultIcon from '../../assets/images/defaultUser.img';

export interface PhotoBlockProps {
	photo: string | undefined;
}

export const PhotoBlock: FC<PhotoBlockProps> = ({ photo }) => {
	const [userPhoto, setUserPhoto] = useState(photo);

	const getFileFromUser = async (userFile: any) => {
		try {
			const role = getRole();
			if (userFile.target.files.length && role) {
				const data = await AuthService.uploadPhoto(
					userFile.target.files[0],
					role
				);
				setUserPhoto(data.photo);
				toast.success('The photo is uploaded');
			}
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	return (
		<div className="photoBlock">
			<img
				src={
					userPhoto ||
					'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp'
				}
				alt="icon"
				className="avatar"
			/>
			<Tooltip title={`Change photo`}>
				<label htmlFor="avatar" className="photoInput">
					<input
						id="avatar"
						type={'file'}
						onChange={(file) => getFileFromUser(file)}
						style={{ display: 'none' }}
					/>
					<EditOutlinedIcon />
				</label>
			</Tooltip>
		</div>
	);
};
