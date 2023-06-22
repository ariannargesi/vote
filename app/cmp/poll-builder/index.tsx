
'use client'
import { Label, Textarea, className as inputClassName, Switch, Input } from "@/components/form"
import { Lock, Map } from "react-bootstrap-icons"
import { Controller, FieldError } from "react-hook-form"
import React from "react"
import hookForm from "./hook-form"
import { uesPollBuilder } from "./hook"
import { categories, locations } from "@/shared"
import Fields from "./fields"
import PollOptions from "./poll-options"

const TextError = (props: { error: FieldError | undefined }) => {
    if (props.error === undefined)
        return null
    return <span className="block text-sm text-red-500">{props.error?.message}</span>
}

export default function PollBuilder() {

    const { errors, register, submitHandler, control, fields, addField, removeField } = uesPollBuilder()

    return (
        <form className="flex flex-col h-full overflow-y-scroll">
            <Label>عنوان رای‌گیری</Label>
            <Input {...register('title', hookForm.title)} />
            <TextError error={errors.title} />

            <Fields
                fields={fields}
                addField={addField}
                removeField={removeField}
                errors={errors}
                register={register}
            />

            <Label>توضیحات <span className="text-sm">(اختیاری)</span></Label>
            <Textarea {...register('caption', hookForm.caption)} />
            <TextError error={errors.caption} />
            <Label>دسته‌بندی <span className="text-sm">(اختیاری)</span></Label>

            <Controller
                control={control}
                name="category"
                render={() => (
                    <select className={'input'}>
                        {categories.map(currentItem => (
                            <option key={currentItem}>
                                {currentItem}
                            </option>
                        ))
                        }
                    </select>
                )}
            />
            <div className="mt-4 pt-4  border-t">
                <PollOptions
                    control={control}
                />
            </div>
            
        </form>
    )
}