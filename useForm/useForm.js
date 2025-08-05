import { useState } from 'react'


export const useForm = ( initialForm = {}, onSubmit ) => {
 
    const [formState, setFormState] = useState( initialForm );

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        onSubmit(formState);

        onResetForm();
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        onSubmitForm
    }
}
