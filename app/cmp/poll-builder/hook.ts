import { useForm, useFieldArray } from 'react-hook-form'

export function uesPollBuilder () {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            options: [{ value: '' }, { value: '' }, { value: '' }],
            category: '',
            title: '',
            caption: '',
            anonymous: false,
            location: ''
        }
    })

    const { fields, remove, append } = useFieldArray({
        control,
        name: "options",
    });


    function addField () {
        append({value: ''})
    }
    
    function removeField (index: number) {
        remove(index)
    }


    const submitHandler = handleSubmit((data) => {
        
    })

    return { register, submitHandler, control, errors, fields, addField, removeField  }
}