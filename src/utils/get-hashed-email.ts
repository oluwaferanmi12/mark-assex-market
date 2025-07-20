export const getHashedEmail = (email: string) => {
    const splittedEmail = email?.split("@");
    return `${splittedEmail[0][0]}***@${splittedEmail[1]}`
}