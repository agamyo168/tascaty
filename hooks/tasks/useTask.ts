import * as schema from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useMemo, useState } from "react";
const useTask = () => {
  const db = useSQLiteContext();
  const drizzleDb = useMemo(() => drizzle(db, { schema }), [db]);

  const [tasks, setTasks] = useState<schema.Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasks = await drizzleDb.query.tasks.findMany({
        orderBy: [
          asc(schema.tasks.done),
          desc(schema.tasks.createdAt),
          desc(schema.tasks.id),
        ],
      });
      setTasks(tasks);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [drizzleDb]);

  const addTask = useCallback(
    async (task: schema.TaskInsert) => {
      try {
        setLoading(true);
        await drizzleDb.insert(schema.tasks).values(task);
        fetchTasks();
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    },
    [drizzleDb, fetchTasks]
  );
  const toggleStatus = useCallback(
    async (task: schema.Task) => {
      try {
        setLoading(true);
        await drizzleDb
          .update(schema.tasks)
          .set({ done: task.done === 1 ? 0 : 1 })
          .where(eq(schema.tasks.id, task.id));
        fetchTasks();
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    },
    [drizzleDb, fetchTasks]
  );
  const deleteTask = useCallback(
    async (task: schema.Task) => {
      try {
        setLoading(true);
        await drizzleDb
          .delete(schema.tasks)
          .where(eq(schema.tasks.id, task.id));
        fetchTasks();
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    },
    [fetchTasks, drizzleDb]
  );
  return {
    fetchTasks,
    addTask,
    toggleStatus,
    deleteTask,
    tasks,
    loading,
    error,
  };
};

export default useTask;
