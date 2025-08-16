export interface SocialField {
    username: string;
    isPrivate: boolean;
}

export interface Member {
    id: number;
    username: string;
    created: Date;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    discordUsername: string;
    discordId: number;
    preview?: string;
    major?: string;
    gradDate?: Date;
    linkedin?: SocialField;
    github?: SocialField;
    leetcode?: SocialField;
    resumeUrl?: string;
    local?: string;
    bio?: string;
    groups?: { name: string }[];
    profilePictureUrl?: string;
}

export interface RawMemberData {
    id: number;
    username: string;
    created: string;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    discord_id: number;
    discord_username: string;
    major?: string;
    preview?: string;
    grad_date?: string;
    linkedin?: SocialField;
    github?: SocialField;
    leetcode?: SocialField;
    resume_url?: string;
    local?: string;
    bio?: string;
    groups?: { name: string }[];
    profile_picture_url?: string;
}

export interface RawResumeData {
    id: number;
    file_name: string;
    file_size: number;
    created_at: string;
    feedback: string;
}

export interface Resume {
    id: number;
    fileName: string;
    fileSize: number;
    createdAt: Date;
    feedback: string;
}

export enum ResumeReviewStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    REJECTED = "REJECTED",
}

export enum MessageType {
    SYSTEM = "system",
    ERROR = "error",
    ECHO = "echo",
    LOG_LINE = "log_line",
    LOGS_STARTED = "logs_started",
    LOGS_STOPPED = "logs_stopped",
    RESUME_REVIEWED = "resume_reviewed",
}

export type Message = {
    type: MessageType;
    message: string | undefined;
    user_id: number | undefined;
    username: string | undefined;
    data: Record<string, any> | undefined;
};
