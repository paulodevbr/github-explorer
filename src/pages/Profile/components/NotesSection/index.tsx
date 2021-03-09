import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  text: string;
}

export const NotesSection: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const createNotesRef = useRef<HTMLDivElement>(null);
  const [init, setInit] = useState(false);
  const { notes, addNote, loading } = useNotes();
  const { setRefComponent } = useScroll();
  const { addToast } = useToast();
  const { profile } = useProfile();

  const notesFromUser =
    notes && notes.length
      ? notes.filter(note => note.username === profile.login)
      : null;

  // const notesFromUser = [
  //   {
  //     id: 'fasdfad',
  //     text: 'teste de texto aqui',
  //     username: 'pauloxtr3m',
  //     createdAt: new Date(2021, 2, 8, 10, 10),
  //   },
  //   {
  //     id: 'fasdfada',
  //     text: 'teste de texto2 aqui',
  //     username: 'pauloxtr3m',
  //     createdAt: new Date(2021, 2, 9, 9, 30),
  //   },
  // ];

  useEffect(() => {
    if (!init && createNotesRef.current) {
      setRefComponent({ key: 'create-note', component: createNotesRef });
      setInit(true);
    }
  }, [init, createNotesRef, setRefComponent]);

  const handleSubmit = useCallback(
    async (data: CreateNotesFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          text: Yup.string().required('Text required'),
        });

        await schema.validate(data, { abortEarly: false });

        await addNote({ text: data.text, username: profile.login });
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
    [profile, addNote, addToast],
  );

  if (loading) {
    return (
      <ContainerCenter>
        <LoadingSpinner />
      </ContainerCenter>
    );
  }

  return (
    <>
      <div ref={createNotesRef} style={{ width: '100%' }}>
        <SimpleCard ref={createNotesRef}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Title>New note</Title>
            <TextArea name="text" icon={FiBook} />
            <Row withSpaceBetween width="50%">
              <ActionButton onClick={() => formRef.current?.submitForm()}>
                Save
              </ActionButton>
              <ActionButton onClick={() => formRef.current?.clearField('note')}>
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
            <p>{note.text}</p>
          </NoteCard>
        ))}
    </>
  );
};
