import { User } from "firebase/auth";

export default interface AuthContextType {
    user: User | null 
    token: string | null
}