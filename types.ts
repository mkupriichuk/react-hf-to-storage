import * as yup from "yup";

export interface Person extends yup.Asserts<typeof validationSchema> {}
const schemaData = {
	title: yup.string().required("Title is required"),
	firstName: yup
		.string()
		.required("First Name is required")
		.min(5, "min length 5"),
	lastName: yup.string().required("Last name is required"),
	dob: yup
		.string()
		.required("Date of Birth is required")
		.matches(
			/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
			"Date of Birth must be a valid date in the format YYYY-MM-DD"
		),
	email: yup.string().required("Email is required").email("Email is invalid"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
	acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
};

export const valuesForStorage = Object.keys(schemaData);
export type valuesTypes = keyof typeof schemaData;

export const validationSchema = yup.object(schemaData);
