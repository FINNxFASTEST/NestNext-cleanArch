import { Connection, ClientSession } from 'mongoose';

export async function withTransaction<T>(
  connection: Connection,
  fn: (session: ClientSession) => Promise<T>,
): Promise<T> {
  const session = await connection.startSession();
  session.startTransaction();
  try {
    const result = await fn(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
