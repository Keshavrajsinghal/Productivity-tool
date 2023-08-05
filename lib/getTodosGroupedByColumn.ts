import { databases } from "@/appwrite"
import { Board, Column, TypedColumn } from "@/typings";
import { title } from "process";

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_COLLECTIONS_ID!
    );

    const todos = data.documents;

    console.log(todos);
    // the reduce method accumulates the todos so far, if the list doesn't have a todo in one of the categories so far, it will create one and then push the todo to that category
    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            // next line of code- only push an image if it exists in the database
            ...(todo.image && { image: JSON.parse(todo.image) })
        });

        return acc;

        // making sure that we have a column for each TypeColumn
    }, new Map<TypedColumn, Column>());
    const columnTypes: TypedColumn[] = ["todo", "InProgress", "done"];
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: [],
            });
        }
    }
    console.log(columns);

    // sort the columns now
    const sortedColumns = new Map(
        Array.from(columns.entries()).sort(
            (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])

        )
    );

    const board: Board = {
        columns: sortedColumns
    }

    return board;
};