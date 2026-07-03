'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '../../services/api';
import styles from '../page.module.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');

      await api.post('/users', {
        name,
        email,
        password,
      });

      alert('Usuário cadastrado com sucesso!');
      window.location.href = '/';
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          'Erro ao cadastrar usuário',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>🏋️ FitTrack</h1>

        <p className={styles.subtitle}>
          Crie sua conta para gerenciar seus treinos
        </p>

        <form
          onSubmit={handleRegister}
          className={styles.form}
        >
          <input
            className={styles.input}
            placeholder="Nome"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />

          <input
            className={styles.input}
            placeholder="E-mail"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <input
            className={styles.input}
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <button
            className={styles.button}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        {error && (
          <p className={styles.error}>{error}</p>
        )}

       <div className={styles.footerText}>
        <p>Já possui uma conta?</p>

        <Link href="/">Entrar</Link>
      </div>
      </section>
    </main>
  );
}