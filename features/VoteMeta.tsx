import mock from "@/mock";
import Avatar from "./Avatar";
import Badge from "./Badge";
import { Hstack, Vstack } from "./Common";
import { Incognito, GeoAlt } from 'react-bootstrap-icons'
import { ObjectId } from "mongodb";

const fontSize = 20

interface Props {
    ananymous: boolean,
    creatorId: string,
    location: string,
    createdAt: Date
}

export default function Meta(props: Props) {
    return (
        <Hstack>
            {props.ananymous && (
                <Badge color="info">
                    <Incognito size={fontSize}
                    />
                    <span className="text-sm">امکان رای‌گیری ناشناس</span>
                </Badge>
            )}
            {props.location && (
                <Badge color={'success'}>
                    <GeoAlt />
                    <span className="text-sm">تهران</span>
                </Badge>
            )}

        </Hstack>
    )
}