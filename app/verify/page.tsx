import { headers } from "next/headers"



export default function Verify () {

    const headersList = headers()
    const referer = headersList.get('referer')

    let message  

    if(referer?.indexOf('?poll=true'))
        message = (
           <>یک ایمیل حاوی لینک تایید برات ارسال شد. لطفا لینک رو <span className="text-green-500">کپی</span> و در <span className="text-green-500">همین مرورگر</span> کپی کن</>
        )
    else message = 'یک ایمیل حاوی لینک تایید برات ارسال. روی لینک کلیک کن تا اکاننت تایید بشه!'
    
    return (
        <div className="mt-32 px-8">
            <h1 className="text-2xl font-bold">ایمیلات رو چک کن!</h1>
            <p>
                {message}
            </p>
        </div>
    )
}