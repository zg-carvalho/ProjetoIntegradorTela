import type { Noticia } from '../types/noticia';

const API_URL = 'http://localhost:3000';

export async function fetchNoticias(): Promise<Noticia[]> {
  const res = await fetch(`${API_URL}/noticia`);
  if (!res.ok) throw new Error('Erro ao buscar noticias');
  return res.json();
}

export async function createNoticia(
  noticia: Omit<Noticia, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Noticia> {
  const res = await fetch(`${API_URL}/noticia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noticia),
  });
  if (!res.ok) throw new Error(`Erro ao criar noticia: ${await res.text()}`);
  return res.json();
}

export async function updateNoticia(
  id: number,
  noticia: Partial<Omit<Noticia, 'id' | 'createdAt' | 'updatedAt'>>,
): Promise<Noticia> {
  const res = await fetch(`${API_URL}/noticia/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noticia),
  });
  if (!res.ok) throw new Error(`Erro ao atualizar noticia: ${await res.text()}`);
  return res.json();
}

export async function deleteNoticia(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/noticia/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar noticia');
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_URL}/noticia/upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error(`Erro ao enviar imagem: ${await res.text()}`);
  return res.json();
}
