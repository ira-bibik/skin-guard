import { Dialog, Typography, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { IRequestData } from '../types/types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { RequestService } from '../services/RequestServie';

interface CreateRequestOutletContext {
	doctorId: number;
}

const RequestValidationSchema = Yup.object({
	coverletter: Yup.string()
		.required('This field is required!')
		.min(10, 'The cover letter must be not less than 10 characters ')
		.max(500, 'The cover letter must be not bigger than 100 characters'),
});

const CreateRequest: FC = () => {
	const [open, setOpen] = useState<boolean>(true);
	const context = useOutletContext() as CreateRequestOutletContext;
	const navigate = useNavigate();

	const initialValues: IRequestData = {
		coverletter: '',
		doctorId: context.doctorId,
	};

	const handleClose = () => {
		setOpen(false);
		navigate(-1);
	};

	const createRequest = async (values: IRequestData) => {
		try {
			console.log(values);
			const data = await RequestService.createRequest(values);
			toast.success(data.message);
			navigate(-1);
		} catch (err: any) {
			const error = err.response?.data.message;
			toast.error(error);
		}
	};

	useEffect(() => {
		if (!context.doctorId) {
			navigate('/doctors');
		}
	}, []);
	return (
		<Dialog open={open} onClose={handleClose} scroll="paper">
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => createRequest(values)}
				validationSchema={RequestValidationSchema}
			>
				{({ isValid, touched, errors }) => (
					<Form className="createRequestForm">
						<Typography variant="h5">
							Write your cover letter
						</Typography>
						<Field
							label="Cover letter"
							name="coverletter"
							multiline
							fullWidth
							rows={4}
							as={TextField}
							error={
								touched.coverletter &&
								Boolean(errors.coverletter)
							}
							helperText={
								touched.coverletter && errors.coverletter
							}
						/>
						<Button
							type="submit"
							variant="contained"
							disabled={!isValid}
							className="sendButton"
						>
							Send
						</Button>
					</Form>
				)}
			</Formik>

			<CloseIcon className="closeIcon" onClick={handleClose} />
		</Dialog>
	);
};

export default CreateRequest;
