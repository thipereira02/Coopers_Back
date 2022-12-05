import { contactSchema } from "../schemas/ContactSchema";
import * as contactRepository from "../repositories/contactRepository";

export async function saveMessage(name: string, email: string, telephone: string, text: string) {
    const isValid = contactSchema.validate({ name, email, telephone, text });
    if (isValid.error !== undefined) return false;

    const message = await contactRepository.saveMessage(name, email, telephone, text);
    return message;
}