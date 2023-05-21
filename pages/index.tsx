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
        <div key={currentItem.title} className="bg-gray-100 py-2 my-2 px-4 rounded">
          <Link  href={`/polls/${currentItem._id}`} className="text-blue-600 block">
              <p>{currentItem.title}</p>
              <div className="text-gray-600 text-sm flex gap-x-8">
                <span>۱۲۰۰ رای</span>
                <span>۴۷ نظر</span>
              </div>
          </Link>
        </div>
      ))
      }
    </div>
  )
}