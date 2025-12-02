import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
const useTask = () => {
  const [tasks, setTasks] = useState<schema.Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      //Find tasks using drizzle db:
      const tasks = await drizzleDb.query.tasks.findMany();
      setTasks(tasks);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [drizzleDb]);

  const addTask = async (task: schema.TaskInsert) => {
    try {
      setLoading(true);
      //Add task using drizzle db:
      await drizzleDb.insert(schema.tasks).values(task);
      fetchTasks();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  const toggleStatus = async (task: schema.Task) => {
    try {
      setLoading(true);
      //Mark task as done using drizzle db:
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
  };
  const deleteTask = async (task: schema.Task) => {
    try {
      setLoading(true);
      //Delete task using drizzle db:
      await drizzleDb.delete(schema.tasks).where(eq(schema.tasks.id, task.id));
      fetchTasks();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
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
