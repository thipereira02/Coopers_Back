import connection from "../database";

export async function getUserId(token: string) {
    const result = await connection.query(`
        SELECT * 
        FROM sessions 
        WHERE token = $1`,
        [token]
    );

    return result.rows[0];
}

export async function addTask(description: string, taskType: string, userId: number) {
    await connection.query(`
        INSERT INTO tasks 
        (description, "taskType", "userId", date) 
        VALUES ($1, $2, $3, NOW())`,
        [description, taskType, userId]
    );
}

export async function getTasks(userId: number) {
    const result = await connection.query(`
        SELECT * 
        FROM tasks 
        WHERE "userId" = $1`,
        [userId]
    );

    return result.rows;
}

export async function deleteTask(taskId: number, userId: number) {
    const result = await connection.query(`
        DELETE FROM tasks 
        WHERE id = $1 
        AND "userId" = $2`,
        [taskId, userId]
    );

    return result.rowCount !== 0;
}

export async function deleteAllTasks(userId: number, taskType: string) {
    await connection.query(`
        DELETE FROM tasks 
        WHERE "userId" = $1 
        AND "taskType" = $2`,
        [userId, taskType]
    );
}

export async function updateTaskType(userId: number, taskId: number) {
    await connection.query(`
        UPDATE tasks 
        SET "taskType" = $1 
        WHERE id = $2 
        AND "userId" = $3`,
        ["done", taskId, userId]
    );
}

export async function updateTaskDescription(userId: number, taskId: number, description: string) {
    await connection.query(`
        UPDATE tasks 
        SET description = $1 
        WHERE id = $2 
        AND "userId" = $3`,
        [description, taskId, userId]
    );
}