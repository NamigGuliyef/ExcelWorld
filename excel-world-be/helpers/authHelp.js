import { hash, genSalt, compare } from "bcrypt"

// hashing of passwords
export const hashPassword = async (password) => {
    try {
        const hashPassword = await hash(password, await genSalt())
        return hashPassword
    } catch (error) {
        console.log(error)
    }
}

//comparing user passwords
export const comparePassword = async (password, hashPass) => {
    try {
        return compare(password, hashPass)
    } catch (error) {
        console.log(error)
    }
}
