import filesize from 'filesize';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import alert from '../../assets/alert.svg';
import FileList from '../../components/FileList';
import Header from '../../components/Header';
import Upload from '../../components/Upload';
import api from '../../services/api';
import { Container, Footer, ImportFileContainer, Title } from './styles';

interface FileProps {
  file: File;
  fileName: string;
  size: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    try {
      await Promise.all(
        uploadedFiles.map(file => {
          const data = new FormData();
          data.append('file', file.file, file.fileName);
          return api.post('/transactions/import', data);
        }),
      );

      history.goBack();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  function enviarArquivo(files: File[]): void {
    const filesAdd: FileProps[] = files.map(file => ({
      file,
      fileName: file.name,
      size: filesize(file.size),
    }));

    setUploadedFiles([...uploadedFiles, ...filesAdd]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={enviarArquivo} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
