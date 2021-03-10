import React, { useCallback, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { FiBook } from 'react-icons/all';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Title } from '../../../../components/Title';
import TextArea from '../../../../components/TextArea';
import { Row } from '../../../../components/Row';
import { SimpleCard } from '../../../../components/SimpleCard';
import { useNotes } from '../../../../hooks/notes';
import { ContainerCenter } from '../../styles';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { ActionButton, NoteCard } from './styles';
import { useScroll } from '../../../../hooks/scroll';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { useToast } from '../../../../hooks/toast';
import { useProfile } from '../../../../hooks/profile';
import formatDateTodayYesterday from '../../../../utils/formatDateTodayYesterday';

interface CreateNotesFormData {
  content: string;
}

export const NotesSection: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const createNotesRef = useRef<HTMLDivElement>(null);
  const { notes, loadUserNotes, createNote, clearNotes, loading } = useNotes();
  const { setRefComponent } = useScroll();
  const { addToast } = useToast();
  const { profile } = useProfile();

  const notesFromUser =
    notes && notes.length && profile
      ? notes.filter(note => note.userId === profile.id.toString())
      : null;

  useEffect(() => {
    if (createNotesRef.current) {
      setRefComponent({ key: 'create-note', component: createNotesRef });
    }

    loadUserNotes({ userId: profile.id });

    return () => clearNotes();
  }, []);

  const handleSubmit = useCallback(
    async (data: CreateNotesFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          content: Yup.string().required('Text required'),
        });

        await schema.validate(data, { abortEarly: false });

        await createNote({ content: data.content, userId: profile.id });

        formRef.current?.clearField('content');
        addToast({
          type: 'success',
          title: 'Note saved',
          description: 'Note was saved successfully!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error',
          description: 'An error occurred saving the note, please try again',
        });
      }
    },
    [profile, createNote, addToast],
  );

  return (
    <>
      <div ref={createNotesRef} style={{ width: '100%' }}>
        <SimpleCard ref={createNotesRef}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Title>New note</Title>
            <TextArea name="content" icon={FiBook} />
            <Row withSpaceBetween width="50%">
              <ActionButton
                onClick={() => formRef.current?.submitForm()}
                loading={loading}
              >
                Save
              </ActionButton>
              <ActionButton
                onClick={() => formRef.current?.clearField('content')}
                loading={loading}
              >
                Clear
              </ActionButton>
            </Row>
          </Form>
        </SimpleCard>
      </div>
      {notesFromUser &&
        notesFromUser.length &&
        notesFromUser.map(note => (
          <NoteCard>
            <span>{formatDateTodayYesterday(note.createdAt)}</span>
            <p>{note.content}</p>
          </NoteCard>
        ))}
    </>
  );
};
