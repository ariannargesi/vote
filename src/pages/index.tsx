import { polls as pollsCollection } from "@/db/setup"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"

interface Data {
  dfas: string 
}


export async function getServerSideProps (context: GetServerSidePropsContext) {
 const polls = await pollsCollection.find().toArray()
 return { 
  props: {
    polls: JSON.stringify(polls)
  }
 }
}

export default function Home (props) {

  const polls = JSON.parse(props.polls)

  return (
    <div>
      {polls.map(currentItem => (
          <Link href={`/polls/${currentItem._id}`} className="text-blue-400 underline block">
              {currentItem.title}
          </Link>
      ))
      }
    </div>
  )
}