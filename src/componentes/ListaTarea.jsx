import React from 'react';
import ItemTarea from './ItemTarea';

const ListaTarea = ({ tareas, onEliminarTarea }) => {
    return (
        <div>
            {tareas.length === 0 ? (
                <p>No hay tareas</p>
            ) : (
                <ul>
                    {tareas.map((tarea) => (
                        <li key={tarea.id}>
                            <ItemTarea tarea={tarea} onEliminar={onEliminarTarea} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaTarea;
