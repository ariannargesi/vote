import paths from '@/app/paths';
import { Session } from 'inspector';
import { getSession, signIn, useSession } from 'next-auth/react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form'

export function uesPollBuilder () {

    const router = useRouter()
    const session = useSession()
    console.log(session)
    let submitText
    
    switch (session.status) {
        case 'authenticated':
            submitText = 'ثبت رای‌گیری'
            break;
        case 'loading': 
            submitText = 'یه لحظه...'
             break;
        case 'unauthenticated':
            submitText = 'ورود و ثبت رای‌گیری'
            break;
    }

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
        if(session.status === 'unauthenticated'){
            localStorage.setItem('poll', JSON.stringify(data))  
            router.push('/login')
        }
        else {
            // make request to server and save the poll 
        }
    })
    return { register, submitHandler, control, errors, fields, addField, removeField, submitText, isLoading: session.status === 'loading' }
}