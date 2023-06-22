import { Controller } from "react-hook-form"
import { Switch } from "@/components/form"
import { locations } from "@/shared"
import { PinMap } from "react-bootstrap-icons"

export default function PollOptions(props: any) {
    const { control } = props

    return (
        <div className="space-y-2">
            {/* enable ananymous poll */}
            <div>
                <div className="flex items-center gap-x-1">
                    <span>رای‌گیری ناشناس</span>
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
                <p className="text-sm text-light">به کاربران اجازه دهید تا بدون افشا کردن هویتشان در این رای‌گیری شرکت کنند!</p>
            </div>

            {/* poll location setting */}
            <div>   
                <div className="flex items-center gap-x-1">
                    <span>محل رای‌گیری</span>
                    <PinMap/>
                </div>
                <p className="text-sm text-light">فقط کاربران استان انتخاب شده میتونن  در این رای‌گیری شرکت کنن!</p>
                <Controller
                control={control}
                name="location"
                render={() => (
                    <select className={'input mt-1'}>
                        {locations.map(currentItem => (
                            <option key={currentItem}>
                                {currentItem}
                            </option>
                        ))
                        }
                    </select>
                )}
            />
            </div>
        </div>
    )
}