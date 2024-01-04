import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");
    const { data, isFetching, isError, isSuccess, error } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    if (isFetching) return null;
    console.log(data);
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo("");
    };

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    );

    let content;
    if (isFetching) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = data.map((todo) => {
            //JSON.stringify(todos)
            return (
                <article key={todo.id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() =>
                                updateTodo({
                                    ...todo,
                                    completed: !todo.completed,
                                })
                            }
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button
                        className="trash"
                        onClick={() => deleteTodo({ id: todo.id })}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            );
        });
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    );
};
export default TodoList;
