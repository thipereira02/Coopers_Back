import connection from "../database";

export async function saveMessage(name: string, email: string, telephone: string, text: string) {
    const result = await connection.query(`
        INSERT INTO messages
        (name, email, telephone, text, date) 
        VALUES ($1, $2, $3, $4, NOW())`,
        [name, email, telephone, text]
    );
    return result.rowCount !== 0;
}