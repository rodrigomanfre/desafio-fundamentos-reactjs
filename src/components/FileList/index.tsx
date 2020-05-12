import React from 'react';

import { Container, FileInfo } from './styles';

interface FileProps {
  fileName: string;
  size: string;
}

interface FileListProps {
  files: FileProps[];
}

const FileList: React.FC<FileListProps> = ({ files }: FileListProps) => {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.fileName}>
          <FileInfo>
            <div>
              <strong>{uploadedFile.fileName}</strong>
              <span>{uploadedFile.size}</span>
            </div>
          </FileInfo>
        </li>
      ))}
    </Container>
  );
};

export default FileList;
