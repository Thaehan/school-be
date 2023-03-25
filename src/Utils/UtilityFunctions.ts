import { hash } from "bcrypt"
import { hashSaltRound } from "../Config/config"

export const hashFunction = async (plaintext: string) => {
  try {
  const encoded = await hash(plaintext, hashSaltRound);
  return encoded
  } catch(error) {
    console.error(error);
  }
}