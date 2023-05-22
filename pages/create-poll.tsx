
import Button from "@/components/Button"
import Input, { Label, Textarea, className as inputClassName, Switch } from "@/components/form"
import { Lock, Map, Plus, Trash2 } from "react-bootstrap-icons"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from "next"
import { getServerSession, unstable_getServerSession } from "next-auth"
import authOption from "./api/auth/[...nextauth]"
import axios from "axios"
import Spinner from '@/components/Spinner'
import React from "react"
import { Content, Footer, Header, Page } from "./cmp"
import httpServer from "@/axios"
const inputErrorClassName = 'block text-sm text-red-500'

function numToFa(index: number) {
    if (index === 0)
        return 'اول'
    else if (index === 1)
        return 'دوم'
    else if (index === 2)
        return 'سوم'
    else if (index === 3)
        return 'چهارم'
    else if (index === 4)
        return 'پنجم'
    else if (index === 5)
        return 'ششم'
    else new Error(index, 'Not supported')
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {

        }
    }
}

export default function NewVote() {
    const [type, setType] = React.useState(null)

    const session = useSession()
    const [isLoading, setLoading] = React.useState(false)
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            options: ['', ''],
            title: '',
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options"
    });

    function addOption() {
        append('')
    }

    function submitHandler(data) {
        
    }
    console.log(errors)
    return (
        <Page>
            <Header>
                <h1 className="text-xl font-bold">ایجاد رای‌گیری</h1>
            </Header>
            <Content>
                <form className="flex flex-col justify-between h-full overflow-y-scroll">
                    <div>
                        <Label>عنوان رای‌گیری</Label>
                        <Input  {...register('title', {
                            required: true,
                            minLength: {
                                value: 16,
                                message: 'عنوان باید حداقل 16 کاراکتر داشته باشه!'
                            },
                            maxLength: {
                                value: 256,
                                message: 'عنوان باید زیر 257 کلمه باشه!'
                            }
                        })} />
                        {errors.title && <span className={inputErrorClassName}>{errors.title.message}</span>}

                        {/* OPTIONS */}
                        {/* <div className="px-3">
                            <ul className="mb-3">
                                {fields.map((item, index) => (
                                    <li key={item.id}>
                                        <div className="flex items-center gap-2">
                                            <Label sm>گزینه‌ی {numToFa(index)}</Label>
                                            {index > 1 &&
                                                <button type="button" onClick={() => remove(index)}> <Trash2 size={20} color='gray' /></button>
                                            }
                                        </div>
                                        <Input {...register(`options.${index}`, {
                                            required: 'این یکی رو یادت رفت!',
                                            maxLength: {
                                                value: 128,
                                                message: 'خیلی طولانی شد!‌باید کمتر از 267 کاراکتر باشه!'
                                            }
                                        })} />
                                        {errors[`option-${1 + index}`] && <span className="text-red-400">{errors[`option-${1 + index}`].message}</span>}
                                    </li>
                                ))}
                            </ul>
                            {fields.length < 6 &&
                                <Button type='button' outline onClick={addOption}> افزودن <Plus size={20} /></Button>
                            }
                        </div>
                        <br />

                        <Label> توضیحات <span className="text-sm">(اختیاری)</span></Label>
                        <Textarea {...register('...caption', {
                            required: false, maxLength: {
                                value: 1024,
                                message: 'توضیحات باید کمتر از 1025 کاراکتر باشه!'
                            }
                        })} />
                        {errors.caption && <span className="text-red-400">{errors.caption.message}</span>}
                        <Label>دسته‌بندی <span className="text-sm">(اختیاری)</span></Label>
                        <select className={inputClassName} {...register('cat', { required: false })}>
                            <option value="without_cat">بدون دسته‌بندی</option>
                            <option value="economi">اقتصاد</option>
                            <option value="politic">سیاست</option>
                        </select>
                        <hr className="mt-5 mb-3" />
                        <div className="flex gap-1 justify-between items-center">
                            <div>
                                <span className="text-lg font-bold flex gap-2 items-center">رای‌گیری ناشناس <Lock size={20} /></span>
                                <p className="text-sm">به کاربران اجازه دهید تا بدون افشا کردن هویتشان در این رای‌گیری شرکت کنند!</p>
                            </div>
                            <div>
                                <Controller
                                    name="anonymous"
                                    control={control}
                                    defaultValue={true}
                                    render={props =>
                                        <Switch value={props.field.value}
                                            onChange={() => props.field.onChange(!props.field.value)}
                                        />
                                    }
                                />
                            </div>
                        </div>*/}
                        <div className="mt-3 mb-2">
                            <span className="text-lg font-bold flex gap-2 items-center">محل رای‌گیری <Map size={20} /></span>
                            <p className="text-sm">فقط کاربران استان مورد نظر میتوانند در این رای‌گیری شرکت کنند.</p>
                        </div> 
                        {/* TODO لیست شهر ها رو از فایل استاتیکز بخون */}
                        <select className={inputClassName} {...register('city', { required: false })}>
                            <option value="all">مهم نیست</option>
                            <option value="گیلان">گیلان</option>
                            <option value="politic">تهران</option>
                        </select>
                    </div>
                </form>
                                    
            </Content>
            <Footer>
                <Button type='submit' color="info"  extendClass="w-1/3" onClick={handleSubmit(submitHandler)}>
                    ذخیره
                    {isLoading && <Spinner/> }
                </Button>
            </Footer>
        </Page>
    )
}

