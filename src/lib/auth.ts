import {User} from "../types/user.ts";

const getUserDataFromLocalStorage = (): User | null => {
    const user = localStorage.getItem("user")
    if (!user) {
        return null
    }
    return JSON.parse(user)
}

export {
    getUserDataFromLocalStorage
}