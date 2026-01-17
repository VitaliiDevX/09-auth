import { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";
import { api } from "./api";
import { cookies } from "next/headers";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  searchText?: string;
  page: number;
  tag?: NoteTag;
}

export interface CheckSessionRequest {
  success: boolean;
}

async function getAuthHeaders() {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const config = await getAuthHeaders();
  const { data } = await api.get("/notes", {
    ...config,
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
  const config = await getAuthHeaders();
  const { data } = await api.get(`/notes/${id}`, config);
  return data;
}

export async function getMe(): Promise<User> {
  const config = await getAuthHeaders();
  const { data } = await api.get("/users/me", config);
  return data;
}

export async function checkSession() {
  const config = await getAuthHeaders();
  const res = await api.get<CheckSessionRequest>("/auth/session", config);
  return res;
}

export const getTags = (): NoteTag[] => {
  return ["Todo", "Work", "Personal", "Meeting", "Shopping"];
};
