import { devPrint } from "../utils";
import api from "./api";

export const uploadFile = async (
    file: File,
    presignedUrl: string
): Promise<string> => {
    const options = {
        method: "PUT",
        body: file,
    };

    return await fetch(presignedUrl, options).then((response) => {
        devPrint("Response:", response);
        if (!response.ok) {
            throw new Error(`Failed to upload file: ${response.statusText}`);
        }
        return response.url;
    });
};

export const getPresignedUrl = async (
    fileName: string,
    fileSize: number
): Promise<{ key: string; presignedUrl: string }> => {
    const response = await api.post("/resume/upload/", {
        file_name: fileName,
        file_size: fileSize / 1024, // Convert to KB
    });
    if (response.status !== 201) {
        throw new Error(`Failed to get presigned URL: ${response.statusText}`);
    }

    return { ...response.data, presignedUrl: response.data.presigned_url };
};

export const devPublishToReview = async (key: string) => {
    if (!import.meta.env.DEV) {
        console.error(
            "devPublishToReview can only be called in development mode"
        );
        return;
    }

    const response = await api.post("/resume/publish-to-review/", {
        key,
    });

    if (response.status !== 200) {
        throw new Error(`Failed to publish to review: ${response.statusText}`);
    }

    return response.data;
};
