import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { Task as TaskType } from "./types/Task.type";
import Task from "./Components/Task";

function App() {
  const [edit, setEdit] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  let todos = JSON.parse(localStorage.getItem("todos") as string) || [];
  const [tasks, setTask] = useState<TaskType[]>(todos);
  const [taskId, setTaskId] = useState<string>("");
  const onEdit = (id: string, content: string) => {
    setValue(content);
    setEdit(true);
    setTaskId(id);
  };
  const editTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isTodoExist = (todos as TaskType[]).find(
      (item) => value === item.content
    );
    if (isTodoExist) {
      setValue("");
      setEdit(false);
      return;
    }
    todos = (todos as TaskType[]).map((todo) => {
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
    const isTodoExist = (todos as TaskType[]).find(
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
    todos = (todos as TaskType[]).filter((todo) => todo.id != id);
    setTask(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const completeTask = (id: string) => {
    todos = (todos as TaskType[]).map((todo) => {
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
    setValue("");
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const unCompletTask = (id: string) => {
    todos = (todos as TaskType[]).map((todo) => {
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
  const handleOnDragEnd = (result: DropResult) => {
    const todos = Array.from(tasks);
    const [reorderedItem] = todos.splice(result.source.index, 1);
    todos.splice(
      (result.destination as DraggableLocation).index,
      0,
      reorderedItem
    );

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
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div
                    className="flex flex-col max-h-[30vh] overflow-auto"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.length > 0 &&
                      tasks.map((task, index) => {
                        if (task.status === "todo") {
                          return (
                            <Task
                              key={task.id}
                              id={task.id}
                              index={index}
                              completeTask={completeTask}
                              deleteTask={deleteTask}
                              onEdit={onEdit}
                              task={task}
                            />
                          );
                        }
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
