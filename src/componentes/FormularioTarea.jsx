import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebaseConfig';

const FormularioTarea = ({ onAgregarTarea }) => {
    const [nombreTarea, setNombreTarea] = useState('');
    const [fechaLimite, setFechaLimite] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "Este campo es obligatorio.",
            },
        })
    );

    const handleNombreChange = (e) => setNombreTarea(e.target.value);
    const handleFechaChange = (e) => setFechaLimite(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validator.current.allValid()) {
            setLoading(true);
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
                const prioridadSugerida = response.data.completed;

                const tarea = {
                    nombre: nombreTarea,
                    fechaLimite: fechaLimite,
                    prioridad: prioridadSugerida,
                };

                // Guardar la tarea en Firestore
                const docRef = await addDoc(collection(db, 'tareas'), tarea);

                // Actualiza el estado en App solo con la tarea añadida
                onAgregarTarea({ id: docRef.id, ...tarea });
                setMensaje(`Tarea "${nombreTarea}" agregada exitosamente con prioridad "${prioridadSugerida}".`);

                // Limpiar los campos después de agregar
                setNombreTarea('');
                setFechaLimite('');
            } catch (error) {
                console.error("Error al agregar la tarea:", error);
            } finally {
                setLoading(false);
            }
        } else {
            validator.current.showMessages();
        }
    };

    return (
        <>
            <h2>Agregar Tarea</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la Tarea:</label>
                    <input type="text" value={nombreTarea} onChange={handleNombreChange} />
                    {validator.current.message('nombre de la tarea', nombreTarea, 'required')}
                </div>
                <div>
                    <label>Fecha Límite:</label>
                    <input type="date" value={fechaLimite} onChange={handleFechaChange} />
                    {validator.current.message('fecha límite', fechaLimite, 'required')}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Agregar Tarea'}
                </button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </>
    );
};

export default FormularioTarea;
