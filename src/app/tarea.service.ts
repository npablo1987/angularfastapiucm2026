// ============================================================
// tarea.service.ts
// Servicio que centraliza TODAS las llamadas HTTP a la API de
// FastAPI. Los componentes usan este servicio y así no necesitan
// conocer la URL ni los detalles de cada petición.
// ============================================================
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea, TareaCreate } from './tarea.model';

// providedIn: 'root' -> Angular crea UNA sola instancia del servicio
// y la comparte con toda la aplicación.
@Injectable({ providedIn: 'root' })
export class TareaService {
  // inject() obtiene el HttpClient registrado en app.config.ts.
  private http = inject(HttpClient);
  // URL base de la API (backend FastAPI corriendo en el puerto 8000).
  private url = 'http://localhost:8000/tareas';

  // Cada método devuelve un Observable: la petición se envía recién
  // cuando alguien llama a .subscribe() sobre él.

  // GET /tareas -> lista de tareas
  listar(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.url);
  }

  // GET /tareas/{id} -> una tarea
  obtener(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.url}/${id}`);
  }

  // POST /tareas -> crea una tarea (el objeto se envía como JSON en el body)
  crear(tarea: TareaCreate): Observable<Tarea> {
    return this.http.post<Tarea>(this.url, tarea);
  }

  // PUT /tareas/{id} -> reemplaza los datos de una tarea
  actualizar(id: number, tarea: TareaCreate): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.url}/${id}`, tarea);
  }

  // DELETE /tareas/{id} -> elimina una tarea (la API responde 204, sin contenido)
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
