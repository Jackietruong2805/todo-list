import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  content: string;
  status: "todo" | "complete";
}

function App() {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  let todos = JSON.parse(localStorage.getItem("todos") as string) || [];
  const [tasks, setTask] = useState<Task[]>(todos);
  const [taskId, setTaskId] = useState<string>("");
  const onEdit = (id: string, content: string) => {
    setValue(content);
    setEdit(true);
    setTaskId(id);
  };
  const editTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isTodoExist = (todos as Task[]).find(
      (item) => value === item.content
    );
    if (isTodoExist) {
      setValue("");
      setEdit(false);
      return;
    }
    todos = (todos as Task[]).map((todo) => {
      if (todo.id === taskId) {
        return {
          id: taskId,
          content: value,
          status: "todo",
        };
      }
      return todo;
    });
    setTask(todos);
    setEdit(false);
    setValue("");
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      id: uuidv4(),
      content: value,
      status: "todo",
    };
    const isTodoExist = (todos as Task[]).find(
      (item) => todo.content === item.content
    );
    if (isTodoExist) {
      setValue("");
      return;
    }
    todos = [...todos, todo];
    localStorage.setItem("todos", JSON.stringify(todos));
    setTask(todos);
    setValue("");
  };
  const deleteTask = (id: string) => {
    todos = (todos as Task[]).filter((todo) => todo.id != id);
    setTask(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const completeTask = (id: string) => {
    todos = (todos as Task[]).map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: "complete",
        };
      }
      return todo;
    });
    setTask(todos);
    setEdit(false);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const unCompletTask = (id: string) => {
    todos = (todos as Task[]).map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: "todo",
        };
      }
      return todo;
    });
    setTask(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  return (
    <div className="flex items-center justify-center w-full h-full px-3 bg-violet-500">
      <div className="mx-auto max-w-[600px] w-full rounded-md p-3 bg-slate-800 py-8">
        <h1 className="text-2xl font-semibold text-center text-white mb-7">
          Give Me Tasks
        </h1>
        <div className="mx-auto max-w-[94%]">
          <form
            onSubmit={(e) => editTask(e)}
            noValidate
            className={`flex mt-5 mb-2 border border-violet-500 ${
              edit
                ? "opacity-100 visible transition-all delay-150 scale-100"
                : "opacity-0 invisible absolute scale-75"
            }`}
          >
            <input
              className="px-2 font-semibold text-white bg-transparent border-none outline-none grow"
              type="text"
              placeholder="Edit a task"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <button
              className="px-3 py-2 font-semibold text-white bg-violet-500"
              type="submit"
            >
              Edit Task
            </button>
          </form>
          {!edit && (
            <form
              onSubmit={(e) => addTask(e)}
              className="flex mb-2 border border-violet-500"
            >
              <input
                className="px-2 font-semibold text-white bg-transparent border-none outline-none grow"
                type="text"
                placeholder="Enter a task"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
              <button className="px-3 py-2 font-semibold text-white bg-violet-500">
                Add Task
              </button>
            </form>
          )}
          <div className="pt-3">
            <h3 className="mb-3 text-xl text-left text-gray-400">Todo</h3>
            <div className="flex flex-col max-h-[30vh] overflow-auto todo">
              {tasks.length > 0 &&
                tasks.map((task) => {
                  if (task.status === "todo") {
                    return (
                      <div
                        key={task.id}
                        className="px-3 py-2 mb-4 font-semibold text-white rounded-sm cursor-pointer bg-violet-500"
                      >
                        <div className="flex items-center justify-between">
                          <span>{task.content}</span>
                          <span className="flex gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                              onClick={() => completeTask(task.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                              onClick={() => onEdit(task.id, task.content)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                              onClick={() => deleteTask(task.id)}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="pt-3">
            <h3 className="mb-3 text-xl text-left text-gray-400">Done</h3>
            <div className="flex flex-col max-h-[30vh] overflow-auto todo">
              {tasks.length > 0 &&
                tasks.map((task) => {
                  if (task.status === "complete") {
                    return (
                      <div className="px-3 py-2 mb-4 font-semibold text-white rounded-sm cursor-pointer bg-violet-500">
                        <div className="flex items-center justify-between">
                          <span className="line-through decoration-gray-200 text-white/50">
                            {task.content}
                          </span>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5"
                              onClick={() => unCompletTask(task.id)}
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
