import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(password,salt)
    return hashPassword;
}

export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}