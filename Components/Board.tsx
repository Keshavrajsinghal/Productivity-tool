'use client';
import { useBoardStore } from '@/store/BoardStore';
import { Column, Todo } from '@/typings';
import { ViewColumnsIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Columnfu from './Column';

function Board() {
    const [board, getBoard, setBoardState] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState
    ]);
    // still need to understand what useEffect is- allows us to perform side effects in functional components
    useEffect(() => {
        getBoard();
    }, [getBoard]);

    console.log(board);

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) return;

        if (type === "column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangedColumns = new Map(entries);
            setBoardState({
                ...board,
                columns: rearrangedColumns,
            });
        }
        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos,
        };
        const finishCol: Column = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos,
        };
        if (!startCol || !finishCol) return;

        if (source.index === destination.index && startCol === finishCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if (startCol.id === finishCol.id) {
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCol);

            setBoardState({ ...board, columns: newColumns });
        } else {
            // dragging to another column
            const finishTodos: Todo[] = Array.from(finishCol.todos);
            finishTodos.splice(destination.index, 0, todoMoved);

            const newColumns = new Map(board.columns);
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };
            newColumns.set(startCol.id, newCol);
            newColumns.set(finishCol.id, {
                id: finishCol.id,
                todos: finishTodos,
            });

            // Update board state
            updateToDoinDB(todoMoved, finishCol.id);

            setBoardState({ ...board, columns: newColumns })
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='board' direction='horizontal' type='column'>
                {/* DragDropContext is a wrapper component from react-beautiful-dnd that provides the context for the drag and drop behavior. Droppable is another component from react-beautiful-dnd that defines a droppable area where todos can be dropped (moved around).  */}
                {(provided) => (<div
                    className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >{Array.from(board.columns.entries()).map(([id, column], index) => (
                    <Columnfu
                        key={id}
                        id={id}
                        todos={column.todos}
                        index={index} />
                ))}
                </div>)}
                {/* Overall, this code snippet maps over the entries of the board.columns Map, creates a new Column component for each column, and passes relevant props to each Column. It allows the rendering of the columns dynamically based on the data present in the board.columns Map. */}
            </Droppable>
        </DragDropContext>
    );
}

export default Board

function updateToDoinDB(todoMoved: any, id: any) {
    throw new Error('Function not implemented.');
}
