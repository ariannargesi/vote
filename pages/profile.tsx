import Button from "@/features/Button"
import { signIn, signOut, useSession } from "next-auth/react"
import cn from 'classnames'
import SelectUsername from "@/features/profile/SelectValidUsername"
import { Label, Textarea } from "@/features/form"
const li = 'py-1 px-4 rounded'

export function MyPolls (props) {
    return (
        <div>
            {props.list.map(currentItem => (
                <div key={Math.random()} className="py-2 px-4 rounded my-2 bg-gray-100">
                    <span>بهترین گزینه برای شهرداری رشت کدام است؟</span>
                    <div className="flex gap-x-8">
                        <span className="text-sm italic text-gray-600">۱۲۰۰ شرکت کننده</span>
                        <span className="text-sm italic text-gray-600">۴۵ نظر</span>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

export default function Profile() {
    const { data } = useSession()
    return (
        <div>
            <div className="absolute right-0 mr-16">
                <ul>
                    <li className={cn(li, 'bg-blue-100 text-blue-600')}>رای‌گیری های من</li>
                    <li className={li}>پروفایل من</li>
                    <li className={li}>تحیلیل رای‌گیری (بزودی)</li>
                </ul>
            </div>
            {/* <SelectUsername onChange={function (value: boolean): void {
                throw new Error("Function not implemented.")
            }} name={""} />
            <Label>بایو</Label>
            <Textarea/>
            <div className="mt-2" >
                <Button color="success">ذخیره</Button>
            </div> */}
            <MyPolls list={[1,2,3,4,4,5,6,7,7,78]}/>
        </div>
    )
}