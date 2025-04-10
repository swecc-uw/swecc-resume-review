import api from './api';

export const uploadFile = async (
  file: File,
  presignedUrl: string
): Promise<string> => {
  const options = {
    method: 'PUT',
    body: file,
  };

  return await fetch(presignedUrl, options).then((response) => {
    console.log('Response:', response);
    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }
    return response.url;
  });
};

export const getPresignedUrl = async (
  fileName: string,
  fileSize: number
): Promise<string> => {
  const response = await api.post('/resume/upload/', {
    file_name: fileName,
    file_size: fileSize / 1024, // Convert to KB
  });
  if (response.status !== 201) {
    throw new Error(`Failed to get presigned URL: ${response.statusText}`);
  }

  return response.data.presigned_url;
};
