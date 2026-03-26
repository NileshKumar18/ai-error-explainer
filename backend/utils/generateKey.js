import crypto from "crypto"

export const generateKey = (error) => {
    return crypto
        .createHash("sha256")
        .update(error)
        .digest("hex");
}