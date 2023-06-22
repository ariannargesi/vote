import { numToFa } from "@/app/utils"
import { Input, Label } from "@/components/form"
import hookForm from "./hook-form"
import Button from "@/components/Button"
import { Plus, X } from "react-bootstrap-icons"
import { TextError } from "."

export default function Fields(props: any) {
    const { fields, addField, removeField, register, errors } = props
    return (
        <div>
            <Label>گزینه‌های قابل‌ انتخاب!</Label>
            <ul className="space-y-3">
                {fields.map((item: any, index: number) => (
                    <li key={item.id} className="text-gray-800 flex items-center">
                        <div className="w-8">
                            {fields.length > 2 && <X fontSize={20} className="text-gray-400" onClick={() => removeField(index)} />}
                        </div>
                        <div className="w-full">
                            <Input placeholder={`گزینه‌ي ${numToFa(index)}`} {...register(`options.${index}.value`,
                                hookForm.option)} />
                            <TextError error={errors['options'] && errors['options'][index] ? errors['options'][index].value : undefined  }  />

                        </div>
                    </li>
                ))}
            </ul>
            {fields.length < 6 &&
                <div className="flex mt-3">
                    <div className="w-8"></div>
                    <Button type="button" full outline onClick={addField}> افزودن <Plus size={20} /></Button>
                </div>
            }
        </div>
    )
}