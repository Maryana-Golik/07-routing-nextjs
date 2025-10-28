import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});



export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axiosInstance.get<FetchNotesResponse>(`/notes`, {
    params,
  });
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await axiosInstance.post<Note>( "/notes",note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};

export async function getNoteById(id:string) {
  const res = await axiosInstance.get<Note>(`/notes/${id}`);
  return res.data;
}
