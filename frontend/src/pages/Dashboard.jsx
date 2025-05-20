import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"

export const Dashboard=()=> {
    return <div>
        <Appbar />
        <div className="m-8">
            <Users />
        </div>
    </div>
    
}