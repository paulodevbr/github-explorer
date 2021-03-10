import React, { createContext, useCallback, useState, useContext } from 'react';
import { parseISO } from 'date-fns';
import api from '../services/api';

interface NoteResponse {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
}

interface Note {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

interface NotesState {
  notes: Note[];
}

interface LoadUserNotesParams {
  userId: string;
}

interface AddNoteParams {
  userId: string;
  content: string;
}

interface NotesContextData {
  notes: Note[];
  loading: boolean;
  createNote(params: AddNoteParams): Promise<void>;
  loadUserNotes(params: LoadUserNotesParams): Promise<void>;
  clearNotes(): void;
}

const Notes = createContext<NotesContextData>({} as NotesContextData);

export const NotesProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<NotesState>({} as NotesState);
  const [loading, setLoading] = useState(false);

  const loadUserNotes = useCallback(async ({ userId }: { userId: string }) => {
    setLoading(true);

    try {
      const notesReponse = (await api.get<NoteResponse[]>(`/notes/${userId}`))
        .data;

      const notes = notesReponse.map(note => ({
        id: note.id,
        userId: note.user_id,
        content: note.content,
        createdAt: parseISO(note.created_at),
      }));

      setData({ notes });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(
    async ({ userId, content }: AddNoteParams) => {
      setLoading(true);

      try {
        const noteResponse = (
          await api.post<NoteResponse>(`/notes`, {
            user_id: userId.toString(),
            content,
          })
        ).data;

        const newNote: Note = {
          id: noteResponse.id,
          userId: noteResponse.user_id,
          content: noteResponse.content,
          createdAt: parseISO(noteResponse.created_at),
        };

        const newNotes = [...data.notes, newNote];

        setData({ notes: newNotes });

        setLoading(false);
      } catch (e) {
        if (e.response) {
          console.log(e.response.data.validation.body);
        } else {
          console.log(e);
        }
      } finally {
        setLoading(false);
      }
    },
    [data.notes],
  );

  const clearNotes = useCallback(() => setData({} as NotesState), []);

  return (
    <Notes.Provider
      value={{
        notes: data.notes,
        loading,
        createNote,
        loadUserNotes,
        clearNotes,
      }}
    >
      {children}
    </Notes.Provider>
  );
};

export const useNotes = (): NotesContextData => {
  const context = useContext(Notes);

  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return context;
};
