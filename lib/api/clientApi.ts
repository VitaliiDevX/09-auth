import { User } from "@/types/user";
import { Note, NoteData, NoteTag } from "../../types/note";
import { api } from "./api";
import { CheckSessionRequest } from "./serverApi";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  searchText?: string;
  page: number;
  tag?: NoteTag;
}

export interface UserData {
  password: string;
  email: string;
}

interface UpdateUserRequest {
  username?: string;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const { data } = await api.get("/notes", {
    params: {
      search: params.searchText,
      page: params.page,
      perPage: 12,
      tag: params.tag,
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(note: NoteData): Promise<Note> {
  const { data } = await api.post("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}

export async function register({ email, password }: UserData): Promise<User> {
  const { data } = await api.post("/auth/register", { email, password });
  return data;
}

export async function login({ email, password }: UserData): Promise<User> {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession() {
  const { data } = await api.get<CheckSessionRequest>("/auth/session");
  return data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get("/users/me");
  return data;
}

export async function updateMe(payload: UpdateUserRequest): Promise<User> {
  const { data } = await api.patch("/users/me", payload);
  return data;
}
