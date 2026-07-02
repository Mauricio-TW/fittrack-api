'use client';

import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import styles from './dashboard.module.css';

interface Workout {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/';
    return;
  }

  loadWorkouts();
}, []);

  async function loadWorkouts() {
    try {
      const response = await api.get('/workouts');
      setWorkouts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSaveWorkout(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        await api.patch(`/workouts/${editingId}`, {
          title,
          description,
        });

        alert('Treino atualizado com sucesso!');
      } else {
        await api.post('/workouts', {
          title,
          description,
        });

        alert('Treino cadastrado com sucesso!');
      }

      setTitle('');
      setDescription('');
      setEditingId(null);

      loadWorkouts();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar treino.');
    }
  }

  function handleEditWorkout(workout: Workout) {
    setEditingId(workout.id);
    setTitle(workout.title);
    setDescription(workout.description);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function handleDeleteWorkout(id: string) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este treino?',
    );

    if (!confirmar) return;

    try {
      await api.delete(`/workouts/${id}`);

      loadWorkouts();
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir treino.');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div>
            <h1>🏋️ FitTrack</h1>
            <p>Olá,👋</p>
          </div>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <strong>{workouts.length}</strong>
          <span>Total de treinos</span>
        </div>

        <div className={styles.statCard}>
          <strong>{new Date().toLocaleDateString('pt-BR')}</strong>
          <span>Data atual</span>
        </div>
      </div>
    </header>

      <section className={styles.form}>
        <h2>
          {editingId ? 'Editar Treino' : 'Novo Treino'}
        </h2>

        <form onSubmit={handleSaveWorkout}>
          <input
            className={styles.input}
            placeholder="Título do treino"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />

          <textarea
            className={styles.textarea}
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className={styles.primaryButton}
          >
            {editingId
              ? 'Atualizar Treino'
              : 'Salvar Treino'}
          </button>

          {editingId && (
            <button
              type="button"
              className={styles.editButton}
              onClick={() => {
                setEditingId(null);
                setTitle('');
                setDescription('');
              }}
            >
              Cancelar
            </button>
          )}
        </form>
      </section>

      <h2>Meus Treinos</h2>

      <section className={styles.cards}>
        {workouts.length === 0 ? (
          <p>Nenhum treino cadastrado.</p>
        ) : (
          workouts.map((workout) => (
            <div
              key={workout.id}
              className={styles.card}
            >
              <h3>{workout.title}</h3>

              <p>{workout.description}</p>

              <small>
                Criado em{' '}
                {new Date(workout.createdAt).toLocaleDateString(
                  'pt-BR',
                )}
              </small>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.editButton}
                  onClick={() =>
                    handleEditWorkout(workout)
                  }
                >
                  ✏️ Editar
                </button>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() =>
                    handleDeleteWorkout(workout.id)
                  }
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}