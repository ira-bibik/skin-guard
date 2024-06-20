import { FC } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: FC = () => {
	return (
		<div className="errorPage">
			<img
				src="https://cdn2.hubspot.net/hubfs/242200/shutterstock_774749455.jpg"
				alt="img"
			/>
			<Link
				to={'/products'}
				className="link"
			>
				Back
			</Link>
		</div>
	);
};

export default ErrorPage;
