import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ItemTarea = ({ tarea, onEliminar }) => {
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'tareas', id)); 
            onEliminar(id);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    const fechaLimite = tarea.fechaLimite instanceof Object && tarea.fechaLimite.toDate
        ? tarea.fechaLimite.toDate().toLocaleDateString()
        : tarea.fechaLimite;

    return (
        <React.Fragment>
            <h3>{tarea.nombre}</h3>
            <p>Fecha Límite: {fechaLimite}</p>
            <button onClick={() => handleDelete(tarea.id)}>Eliminar Tarea</button>
        </React.Fragment>
    );
};

export default ItemTarea;
