import { collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import FormularioTarea from './componentes/FormularioTarea';
import ItemTarea from './componentes/ItemTarea';
import { db } from './firebaseConfig';

function App() {
  const [tareas, setTareas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar tareas desde Firestore al iniciar la aplicación
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasSnapshot = await getDocs(collection(db, 'tareas'));
        const tareasList = tareasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTareas(tareasList);
      } catch (error) {
        console.error("Error al cargar tareas de Firestore:", error);
      }
    };

    cargarTareas();
  }, []);

  // Función para actualizar el estado local con la nueva tarea agregada
  const agregarTareaEnEstado = useCallback((nuevaTarea) => {
    setTareas((prevTareas) => [...prevTareas, nuevaTarea]);
  }, []);

  // Función para eliminar una tarea en el estado local después de ser eliminada en Firestore
  const eliminarTareaEnEstado = useCallback((id) => {
    setTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== id));
  }, []);

  return (
    <div className="App">
      <h1>Gestión de Tareas</h1>

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Cancelar' : 'Agregar Tarea'}
      </button>

      {mostrarFormulario && <FormularioTarea onAgregarTarea={agregarTareaEnEstado} />}

      {tareas.length === 0 ? (
        <p>No hay tareas pendientes</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id}>
              <ItemTarea tarea={tarea} onEliminar={eliminarTareaEnEstado} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
