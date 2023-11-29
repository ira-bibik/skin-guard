import { FC } from 'react';
import './Profile.css'
// import defaultIcon from '../../assets/images/defaultUser.img';

export interface PhotoBlockProps {
	photo: string | undefined;
}

export const PhotoBlock: FC<PhotoBlockProps> = ({ photo }) => {
	return (
		<img
			src={
				photo ||
				'https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.webp'
			}
			alt="icon"
			className="avatar"
		/>
	);
};
