import connection from "../database";

export async function userIsAvailable(username: string):Promise<boolean> {
    const result = await connection.query(`
        SELECT * 
        FROM users 
        WHERE username = $1
    `, [username]);

    return result.rows.length === 0;
}

export async function emailIsAvailable(email: string):Promise<boolean> {
    const result = await connection.query(`
        SELECT *
        FROM users
        WHERE email = $1
    `, [email]);
    
    return result.rows.length === 0;
}

export async function newUser(username: string, email: string, token: string, hash: string):Promise<string> {        
    const newUser = await connection.query(`
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id
    `, [username, email, hash]);
    
    const createSession = await connection.query(`
        INSERT INTO sessions ("userId", token)
        VALUES ($1, $2)
        RETURNING token
    `, [newUser.rows[0].id, token]);
    return createSession.rows[0].token;
}

export async function userExists(username: string){
    const result = await connection.query(`
        SELECT *
        FROM users
        WHERE username = $1
    `, [username]);

    if (result.rows.length !== 0) return result.rows[0];
    return false;
}

export async function newSession(userId: number, token: string){
    const result = await connection.query(`
        INSERT INTO sessions ("userId", token)
        VALUES ($1, $2)
    `, [userId, token]);

    const session = await connection.query(`
        SELECT token, username 
        FROM sessions
        JOIN users
        ON sessions."userId" = users.id
        WHERE sessions.token = $1
    `, [token]);

    return session.rows[0];
}

export async function finishSession(token: string):Promise<boolean> {
    const result = await connection.query(`
        DELETE FROM sessions
        WHERE token = $1
    `, [token]);
    return result.rowCount === 1;
}