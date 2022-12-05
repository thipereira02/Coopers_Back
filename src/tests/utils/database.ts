import supertest from 'supertest';
import connection from '../../database';
import application from '../../application';

export const agent = supertest(application);

export async function clearDatabase() {
    await connection.query('TRUNCATE TABLE users, sessions, tasks RESTART IDENTITY');
}

export async function closeConnection() {
    await connection.end();
}