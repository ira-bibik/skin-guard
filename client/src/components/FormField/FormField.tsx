import { FC } from 'react';
import { Field, useField } from 'formik';
import { TextField, InputAdornment, Select, FormControl, InputLabel } from '@mui/material';

interface FormFieldProps {
	name: string;
	type: string;
	label: string;
	required?: boolean;
	icon?: React.ReactNode;
	children?: JSX.Element[];
}

export const FormField: FC<FormFieldProps> = (props) => {
	const [field, meta] = useField(props.name);
	// return (
	// 	<Field
	// 		{...field}
	// 		type={props.type}
	// 		label={props.label}
	// 		required={props.required}
	// 		as={props.children ? Select : TextField}
	// 		InputProps={{
	// 			startAdornment: (
	// 				<InputAdornment position="start">
	// 					{props.icon}
	// 				</InputAdornment>
	// 			),
	// 		}}
	// 		fullWidth
	// 		error={meta.touched && !!meta.error}
	// 		helperText={meta.touched && meta.error}
	// 	>
	// 		{props.children}
	// 	</Field>
	// );
	if (props.type === 'select') {
    return (
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select
          {...field}
          label={props.label}
          required={props.required}
          startAdornment={
            <InputAdornment position="start">
              {props.icon}
            </InputAdornment>
          }
        >
          {props.children}
        </Select>
      </FormControl>
    );
  }

  return (
    <Field
      {...field}
      type={props.type}
      label={props.label}
      required={props.required}
      as={TextField}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {props.icon}
          </InputAdornment>
        ),
      }}
      fullWidth
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};
