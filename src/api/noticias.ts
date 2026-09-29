import type { Noticia } from '../types/noticia';
import { authHeaders } from './auth';

const API_URL = 'http://localhost:3000';

export async function fetchNoticias(): Promise<Noticia[]> {
  const res = await fetch(`${API_URL}/noticias`);
  if (!res.ok) throw new Error('Erro ao buscar noticias');
  return res.json();
}

export async function fetchNoticia(id: number): Promise<Noticia> {
  const res = await fetch(`${API_URL}/noticias/${id}`);
  if (!res.ok) throw new Error('noticia não encontrado');
  return res.json();
}

export async function fetchNoticiaBySlug(slug: string): Promise<Noticia> {
  const res = await fetch(`${API_URL}/noticias/slug/${slug}`);
  if (!res.ok) throw new Error('noticia não encontrado');
  return res.json();
}

async function extractError(res: Response, fallback: string): Promise<string> {
  try {
    const body = await res.json();
    return body?.message ?? fallback;
  } catch {
    return fallback;
  }
}

export async function createNoticia(
  noticia: Omit<Noticia, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Noticia> {
  const res = await fetch(`${API_URL}/noticias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(noticia),
  });
  if (!res.ok) throw new Error(await extractError(res, 'Erro ao criar noticia'));
  return res.json();
}

export async function updateNoticia(
  id: number,
  noticia: Partial<Omit<Noticia, 'id' | 'createdAt' | 'updatedAt'>>,
): Promise<Noticia> {
  const res = await fetch(`${API_URL}/noticias/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(noticia),
  });
  if (!res.ok) throw new Error(await extractError(res, 'Erro ao atualizar noticia'));
  return res.json();
}

export async function deleteNoticia(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/noticias/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Erro ao deletar noticia');
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/noticias/upload`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  });
  if (!res.ok) throw new Error(`Erro ao enviar imagem: ${await res.text()}`);
  return res.json();
}
