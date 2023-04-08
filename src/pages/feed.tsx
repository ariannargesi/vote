import Badge from "@/component/Badge"

export function FeedVote(props) {
    return (
        <div className="bg-white rounded-md p-3">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-blue-500 text-lg">رای‌گیری انتخاب بهترین شهردار رشت</h2>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">ایجاد شده: ۱۴/۴/۱</span>
                        <span className="text-sm text-gray-500">۴۲۰۰ مشارکت</span>
                    </div>
                </div>
                <span className="text-2xl text-green-500">۴۱+</span>
            </div>
        </div>
    )
}

export default function Feed() {
    return (
        <div className="h-full p-4 max-w-3xl mx-auto">
            <span>آخرین رای‌گیری‌ها</span>
            <FeedVote />
        </div>
    )
}