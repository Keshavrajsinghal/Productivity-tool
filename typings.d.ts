import { Models } from "appwrite";

interface Board {
    columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "InProgress" | "done"


interface Image {
    bucketId: string;
    fileId: string;
}

interface Todo {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn,
    image?: Image,
}


interface Column {
    id: TypedColumn,
    todos: Todo[]
}

