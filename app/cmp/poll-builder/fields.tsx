import { numToFa } from "@/app/utils"
import { Input, Label } from "@/components/form"
import hookForm from "./hook-form"
import Button from "@/components/Button"
import { Plus, X } from "react-bootstrap-icons"

export default function Fields(props: any) {
    const { fields, addField, removeField, register, errors } = props
    return (
        <div>
            <Label>گزینه‌ها را وارد کن!</Label>
            <ul className="space-y-3">
                {fields.map((item: any, index: number) => (
                    <li key={item.id} className="text-gray-800 flex items-center">
                        <div className="w-8">
                            {fields.length > 2 && <X fontSize={22} className="text-gray-400" onClick={() => removeField(index)} />}
                        </div>
                        <Input placeholder={`گزینه‌ي ${numToFa(index)}`} {...register(`options.${index}.value`,
                            hookForm.option)} />
                        {errors[`options.${index}`] && <span className="text-red-400">{errors[`options.${index}`].message}</span>}
                    </li>
                ))}
            </ul>
            {fields.length < 6 &&
                <div className="flex mt-3">
                    <div className="w-8"></div>
                    <Button full outline onClick={addField}> افزودن <Plus size={20} /></Button>
                </div>
            }
        </div>
    )
}