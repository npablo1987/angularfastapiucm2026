// ============================================================
// app.ts
// Componente principal. Contiene el estado de la pantalla
// (lista de tareas, formulario) y los métodos que se ejecutan
// cuando el usuario hace clic en los botones.
// ============================================================
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarea, TareaCreate } from './tarea.model';
import { TareaService } from './tarea.service';

@Component({
  selector: 'app-root',        // etiqueta <app-root> usada en index.html
  imports: [FormsModule],      // necesario para usar [(ngModel)] en el formulario
  templateUrl: './app.html',   // archivo con la vista (HTML)
  styleUrl: './app.css',       // archivo con los estilos del componente
})
export class App implements OnInit {
  // Servicio que hace las peticiones a la API.
  private tareaService = inject(TareaService);

  // signal = valor reactivo: cuando cambia, la vista se actualiza sola.
  tareas = signal<Tarea[]>([]);                // tareas mostradas en la lista
  editandoId = signal<number | null>(null);    // null = creando; número = editando esa tarea
  error = signal('');                          // mensaje de error a mostrar (vacío = sin error)

  // Datos del formulario, enlazados con los inputs mediante [(ngModel)].
  form: TareaCreate = this.formVacio();

  // ngOnInit se ejecuta una vez, cuando el componente se inicia.
  ngOnInit(): void {
    this.cargar();
  }

  // Pide la lista de tareas a la API y la guarda en el signal.
  cargar(): void {
    this.tareaService.listar().subscribe({
      // next: la petición salió bien -> guardamos los datos.
      next: (data) => {
        this.tareas.set(data);
        this.error.set('');
      },
      // error: la API no respondió (ej. backend apagado).
      error: () => this.error.set('No se pudo conectar con la API. ¿Está corriendo FastAPI en el puerto 8000?'),
    });
  }

  // Se ejecuta al enviar el formulario: crea o actualiza según el caso.
  guardar(): void {
    if (!this.form.titulo.trim()) return; // no permite títulos vacíos

    const id = this.editandoId();
    // Si no estamos editando -> POST (crear). Si estamos editando -> PUT (actualizar).
    const peticion = id === null
      ? this.tareaService.crear(this.form)
      : this.tareaService.actualizar(id, this.form);

    // Al terminar: limpia el formulario y recarga la lista.
    peticion.subscribe(() => {
      this.cancelar();
      this.cargar();
    });
  }

  // Carga los datos de una tarea en el formulario para editarla.
  editar(tarea: Tarea): void {
    this.editandoId.set(tarea.id);
    this.form = { titulo: tarea.titulo, descripcion: tarea.descripcion, completada: tarea.completada };
  }

  // Marca o desmarca una tarea como completada (checkbox de la lista).
  alternar(tarea: Tarea): void {
    // Separa el id del resto de los datos (el body no lleva id).
    const { id, ...datos } = tarea;
    this.tareaService.actualizar(id, { ...datos, completada: !tarea.completada })
      .subscribe(() => this.cargar());
  }

  // Elimina una tarea y luego recarga la lista.
  eliminar(id: number): void {
    this.tareaService.eliminar(id).subscribe(() => this.cargar());
  }

  // Sale del modo edición y deja el formulario vacío.
  cancelar(): void {
    this.editandoId.set(null);
    this.form = this.formVacio();
  }

  // Devuelve un formulario con los valores iniciales.
  private formVacio(): TareaCreate {
    return { titulo: '', descripcion: '', completada: false };
  }
}
