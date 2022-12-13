import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import {
  Container,
  ErrorMessage,
  ItemContainer,
  Spinner,
  SubmitButton,
  SuccessMessage,
  UploadButton
} from './components';
import {
  formatFilesWithEmails,
  removeDuplicates,
  checkFileType
} from '../../utilities';
import { sendEmails } from '../../services';

const Main = () => {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dragOver, setDragOver, onDragOver, onDragLeave } = useDragAndDrop();
  const types = ['text/plain'];

  const formatData = (data) => {
    formatFilesWithEmails(data).then((res) => {
      setFiles((prevState) => {
        if (files) {
          const newState = [...prevState, ...res];
          return removeDuplicates(newState);
        } else {
          const newState = [...res];
          return removeDuplicates(newState);
        }
      });
    });
  };

  const changeHandler = (e) => {
    e.preventDefault();
    const selectedFiles = [...e.target.files];

    if (selectedFiles.length && checkFileType(selectedFiles, types)) {
      formatData(selectedFiles);

      setError('');
    } else {
      setError('Please select a .txt file');
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const selectedFiles = [...e?.dataTransfer?.files];

    if (!checkFileType(selectedFiles, types)) {
      return setError('Please drop a .txt file');
    } else {
      setError('');
    }

    formatData(selectedFiles);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = files.map((file) => file.emails);
    const formattedResult = [...new Set(result.flat())];

    try {
      const response = await sendEmails(formattedResult);
      if (!response.ok) throw await response.json();
      if (response.ok) {
        setFiles(null);
        setSuccess(true);
        setLoading(false);
        setError('');
      }
    } catch (error) {
      setLoading(false);
      if (error.error === 'send_failure') {
        setError(`Send failure to ${error.emails[0]}, please try again`);
      } else if (error.error === 'invalid_email_address') {
        // This will never happend because the emails are checked before sending
        setError(
          `Some emails are wrong, please check them: ${error.emails.toString()}`
        );
      }
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, [success]);

  return (
    <form onSubmit={handleOnSubmit}>
      <Container
        htmlFor="file"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        dragOver={dragOver}
      >
        {!loading ? (
          <>
            <p>
              {!dragOver ? 'Select or drop some files here' : 'Drop here...'}
            </p>
            <UploadButton>
              Upload files
              <input
                type="file"
                accept=".txt"
                multiple="multiple"
                onChange={changeHandler}
                style={{ display: 'none' }}
              />
            </UploadButton>
            {files && (
              <ItemContainer>
                {files.map((file) => (
                  <p key={uuidv4()}>
                    {file.file.name} - {file.emails.length} emails
                  </p>
                ))}
              </ItemContainer>
            )}
            <SubmitButton
              disabled={
                !files ||
                (files && files.length === 1 && !files[0].emails.length)
              }
              type="submit"
            >
              Send files
            </SubmitButton>
            {success && (
              <SuccessMessage>The files were sent correctly</SuccessMessage>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </>
        ) : (
          <Spinner className="main-spinner">
            <div />
            <div />
          </Spinner>
        )}
      </Container>
    </form>
  );
};

export default Main;
