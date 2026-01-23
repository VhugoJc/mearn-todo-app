import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: Date;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // All todos in a single list
  private allTodos = signal<Todo[]>([
    {
      id: 1,
      title: 'Setup Angular Project',
      description: 'Create the initial Angular application structure',
      status: 'completed',
      createdAt: new Date('2026-01-20')
    },
    {
      id: 2,
      title: 'Create Todo Components',
      description: 'Build the todo list interface with drag & drop',
      status: 'in-progress',
      createdAt: new Date('2026-01-22')
    },
    {
      id: 3,
      title: 'Connect to Backend API',
      description: 'Integrate with Express.js backend and MongoDB',
      status: 'todo',
      createdAt: new Date('2026-01-22')
    }
  ]);

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

  createTodo() {
    const title = this.newTodoTitle().trim();
    if (!title) return;
    
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description: this.newTodoDescription(),
      status: 'todo',
      createdAt: new Date()
    };
    
    this.allTodos.update(todos => [...todos, newTodo]);
    this.resetCreateForm();
  }

  editTodo(todo: Todo) {
    this.editingTodo.set({ ...todo });
    this.editingTitle.set(todo.title);
    this.editingDescription.set(todo.description);
    this.isEditModalOpen.set(true);
  }

  saveEdit() {
    const editing = this.editingTodo();
    if (!editing) return;
    
    this.allTodos.update(todos => 
      todos.map(todo => 
        todo.id === editing.id 
          ? { ...todo, title: this.editingTitle(), description: this.editingDescription() }
          : todo
      )
    );
    
    this.resetEditForm();
  }

  deleteTodo(todoId: number) {
    if (confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      this.allTodos.update(todos => todos.filter(todo => todo.id !== todoId));
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
      
      todo.status = statusMap[event.container.id];
      
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
}
