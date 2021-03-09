import React, { createContext, useCallback, useState, useContext } from 'react';
import { uuid } from 'uuidv4';

interface Note {
  id: string;
  username: string;
  text: string;
  createdAt: Date;
}

interface NotesState {
  notes: Note[];
}

interface AddNoteParams {
  username: string;
  text: string;
}

interface NotesContextData {
  notes: Note[];
  loading: boolean;
  addNote(params: AddNoteParams): Promise<Note>;
}

const Notes = createContext<NotesContextData>({} as NotesContextData);

export const NotesProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<NotesState>({ notes: [] });
  const [loading, setLoading] = useState(false);

  const addNote = useCallback(
    async ({ username, text }: AddNoteParams) => {
      setLoading(true);

      const newNote: Note = {
        id: uuid(),
        username,
        text,
        createdAt: new Date(Date.now()),
      };

      const newNotes = [...data.notes, newNote];

      setData({ notes: newNotes });

      setLoading(false);
      return Promise.resolve(newNote);
    },
    [data.notes],
  );

  return (
    <Notes.Provider
      value={{
        notes: data.notes,
        loading,
        addNote,
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
