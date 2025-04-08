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
