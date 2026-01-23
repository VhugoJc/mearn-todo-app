import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { TodoService, Todo } from './services/todo.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, DragDropModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private todoService = inject(TodoService);
  
  // All todos from the backend
  private allTodos = signal<Todo[]>([]);
  
  // Loading and error states
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Computed signals for filtered lists
  todoList = computed(() => this.allTodos().filter(todo => todo.status === 'todo'));
  inProgressList = computed(() => this.allTodos().filter(todo => todo.status === 'in-progress'));
  completedList = computed(() => this.allTodos().filter(todo => todo.status === 'completed'));
  
  // Form fields
  newTodoTitle = signal('');
  newTodoDescription = signal('');
  editingTodo = signal<Todo | null>(null);
  editingTitle = signal('');
  editingDescription = signal('');
  
  // Modal state
  isCreateModalOpen = signal(false);
  isEditModalOpen = signal(false);

  ngOnInit() {
    this.loadTodos();
  }

  private loadTodos() {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.allTodos.set(todos);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.isLoading.set(false);
        console.error('Error loading todos:', error);
      }
    });
  }

  createTodo() {
    const title = this.newTodoTitle().trim();
    if (!title) return;
    
    this.isLoading.set(true);
    
    const newTodo = {
      title,
      description: this.newTodoDescription(),
      status: 'todo' as const
    };
    
    this.todoService.createTodo(newTodo).subscribe({
      next: (createdTodo) => {
        this.allTodos.update(todos => [createdTodo, ...todos]);
        this.resetCreateForm();
        this.closeCreateModal();
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.isLoading.set(false);
        console.error('Error creating todo:', error);
      }
    });
  }

  editTodo(todo: Todo) {
    this.editingTodo.set({ ...todo });
    this.editingTitle.set(todo.title);
    this.editingDescription.set(todo.description);
    this.isEditModalOpen.set(true);
  }

  saveEdit() {
    const editing = this.editingTodo();
    if (!editing || !editing._id) return;
    
    this.isLoading.set(true);
    
    const updates = {
      title: this.editingTitle(),
      description: this.editingDescription()
    };
    
    this.todoService.updateTodo(editing._id, updates).subscribe({
      next: (updatedTodo) => {
        this.allTodos.update(todos => 
          todos.map(todo => 
            todo._id === editing._id ? updatedTodo : todo
          )
        );
        this.resetEditForm();
        this.closeEditModal();
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set(error);
        this.isLoading.set(false);
        console.error('Error updating todo:', error);
      }
    });
  }

  deleteTodo(todoId: string) {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      this.isLoading.set(true);
      
      this.todoService.deleteTodo(todoId).subscribe({
        next: () => {
          this.allTodos.update(todos => todos.filter(todo => todo._id !== todoId));
          this.isLoading.set(false);
        },
        error: (error) => {
          this.error.set(error);
          this.isLoading.set(false);
          console.error('Error deleting todo:', error);
        }
      });
    }
  }

  onDrop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const todo = event.previousContainer.data[event.previousIndex];
      
      // Update status based on target container
      const statusMap: Record<string, Todo['status']> = {
        'todo-list': 'todo',
        'in-progress-list': 'in-progress',
        'completed-list': 'completed'
      };
      
      const newStatus = statusMap[event.container.id];
      
      if (newStatus && todo._id) {
        // Update in backend
        this.todoService.updateTodo(todo._id, { status: newStatus }).subscribe({
          next: (updatedTodo) => {
            // Update local state
            this.allTodos.update(todos => 
              todos.map(t => t._id === todo._id ? { ...t, status: newStatus } : t)
            );
          },
          error: (error) => {
            this.error.set(error);
            console.error('Error updating todo status:', error);
            // Revert the UI change on error
            this.loadTodos();
          }
        });
      }
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Modal controls
  openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal() {
    this.isCreateModalOpen.set(false);
    this.resetCreateForm();
  }

  closeEditModal() {
    this.isEditModalOpen.set(false);
    this.resetEditForm();
  }

  private resetCreateForm() {
    this.newTodoTitle.set('');
    this.newTodoDescription.set('');
  }

  private resetEditForm() {
    this.editingTodo.set(null);
    this.editingTitle.set('');
    this.editingDescription.set('');
  }

  // Helper method to get MongoDB ID for operations
  getTodoId(todo: Todo): string {
    return todo._id || '';
  }
}
