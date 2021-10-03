# React hook for save data from react-hook-form to local/session storage

## Usage

```
const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm();

	const clearStorage = useFormDataToStorage<valuesTypes>({
		watch,
		setValue,
		validate: false, // set shouldValidate  // see more on https://react-hook-form.com/api/useform/setvalue/ 
		dirty: false, // set shouldDirty
		storageKey: "formData", // set storage key
		fieldsToBeSaved: ["title", "firstName", "lastName", "email"], // set fields which be saved to storage
		clearStorageOnUnmount: false, // default true
	});

	function onSubmit(data) {
		alert(JSON.stringify(data, null, 4));
		clearStorage();
		reset();
	}
```
