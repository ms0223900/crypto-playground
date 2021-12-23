import { ChangeEvent, useCallback, useState } from "react"

const useSimpleForm = <FormState extends Record<string, any>>(initFormState = {} as FormState) => {
    const [formState, setState] = useState<FormState>(initFormState as FormState);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLFormElement | HTMLTextAreaElement>) => {
        // e.preventDefault();
        const {
            name, value,
        } = e.target;
        setState(f => ({
            ...(f),
            [name]: value,
        }) as FormState)
    }, []);

    const handleResetForm = useCallback(() => {
        setState({} as FormState)
    }, [])

    return ({
        formState,
        handleChange,
        handleResetForm,
    })
}

export default useSimpleForm