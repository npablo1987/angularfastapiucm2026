// ============================================================
// tarea.model.ts
// Define en TypeScript la forma de una tarea. Debe coincidir con
// el modelo "Tarea" del backend (schemas.py) para que los datos
// JSON que llegan de la API tengan los tipos correctos.
// ============================================================

// Tarea completa, tal como la devuelve la API.
export interface Tarea {
  id: number;           // generado por la base de datos
  titulo: string;
  descripcion: string;
  completada: boolean;
}

// Datos que se envían al crear o actualizar: la misma Tarea pero
// sin "id". Omit<T, 'campo'> crea un tipo nuevo quitando ese campo.
export type TareaCreate = Omit<Tarea, 'id'>;
