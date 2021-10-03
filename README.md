# React hook for save data from react-hook-form to local/session storage (typescript friendly)

## Usage

```typescript
import { useForm } from "react-hook-form";
import useFormDataToStorage from "../hooks/useFormDataToStorage";
import { Person, validationSchema, valuesTypes} from "./yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const {
	register,
	handleSubmit,
	reset,
	watch,
	setValue,
	formState: { errors },
} = useForm<Person>({ resolver: yupResolver(validationSchema) });

const clearStorage = useFormDataToStorage<valuesTypes>({
	watch,
	setValue,
	validate: false, // set shouldValidate  // see more on https://react-hook-form.com/api/useform/setvalue/ 
	dirty: false, // set shouldDirty
	storage: localStorage // set storage local/session (default Local)
	storageKey: "formData", // set storage key
	fieldsToBeSaved: ["title", "firstName", "lastName", "email"], // set fields which be saved to storage
	clearStorageOnUnmount: false, // clear storage on component unmount (default false)
});

function onSubmit(data: Person) {
	alert(JSON.stringify(data, null, 4));
	clearStorage();
	reset();
}
```
