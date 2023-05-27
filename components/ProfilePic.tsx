import Image from "next/image"

export default function ProfilePic (props: {
    src?: string
}) {

    const placeholder = 'https://picsum.photos/150'

    return (
        <div>
            <Image 
                alt="Profile picture"
                className="rounded-full border border-gray-200 border-4"
                src={props.src || placeholder}
                width={100}
                height={100}
            />
        </div>
    )
}