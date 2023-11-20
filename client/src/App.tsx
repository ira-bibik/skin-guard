import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';

const App: FC = () => {
	return <RouterProvider router={router} />;
};

export default App;
