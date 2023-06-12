
import { getUser } from '../helpers/user'
import Client from './client'

export default async function Profile() {

    const user = await getUser()
    return <Client
            username={user.username}
            bio={user.bio}
            location={user.location}
            avatar={user.avatar ? user.avatar.split('/')[1] : undefined}
        />


}
