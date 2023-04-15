import mock from "@/mock";
import Avatar from "./Avatar";
import Badge from "./Badge";
import { Hstack, Vstack } from "./Common";
import { Incognito, GeoAlt } from 'react-bootstrap-icons'
import { ObjectId } from "mongodb";

const fontSize = 20

interface Props {
    ananymous: boolean,
    creatorID: ObjectId,
    
}

export default function VoteMetaData(props: { data: any }) {
    return (
            <Hstack>
                {props.data.anan && (
                    <Badge color="info">
                        <Incognito size={fontSize}
                        />
                        <span className="text-sm">امکان رای‌گیری ناشناس</span>
                    </Badge>
                )}
                {props.data.location && (
                    <Badge color={'success'}>
                        <GeoAlt />
                        <span className="text-sm">تهران</span>
                    </Badge>
                )}
            </Hstack>
    )
}