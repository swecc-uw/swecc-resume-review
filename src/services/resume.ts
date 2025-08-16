import { parseAnyDate } from "../localization";
import type { RawResumeData, Resume } from "../types";
import api from "./api";

const deserializeResume = (rawData: RawResumeData): Resume => {
    return {
        fileName: rawData.file_name,
        fileSize: rawData.file_size,
        createdAt: parseAnyDate(rawData.created_at),
        ...rawData,
    };
};

export const getResumes = async () => {
    const url = "/resume/";
    const res = await api.get(url);
    return res.data.map(deserializeResume);
};
