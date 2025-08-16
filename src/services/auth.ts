import { devPrint } from "../utils";
import api, { getCSRF } from "./api";
import { loadCurrentUser, clearCurrentUser } from "./userStore";

interface LoginParams {
    username: string;
    password: string;
}

export const login = async ({
    username,
    password,
}: LoginParams): Promise<boolean> => {
    const response = await api.post("/auth/login/", {
        username,
        password,
    });

    devPrint("Login response:", response);

    if (response.status !== 200) {
        throw new Error(
            `Login failed: ${response.data.detail ?? "Unknown error"}`
        );
    }

    await getCSRF();

    // Load the current user after successful login
    await loadCurrentUser();

    return true;
};

export const logout = async (): Promise<boolean> => {
    const response = await api.post("/auth/logout/");

    devPrint("Logout response:", response);

    if (response.status !== 200) {
        throw new Error("Logout failed");
    }

    // Clear the current user after successful logout
    clearCurrentUser();

    return true;
};

interface RegisterParams {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    discordUsername: string;
}

export const register = async ({
    username,
    password,
    email,
    firstName,
    lastName,
    discordUsername,
}: RegisterParams): Promise<boolean> => {
    const response = await api.post("/auth/register/", {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName,
        discord_username: discordUsername,
    });

    devPrint("Register response:", response);

    if (response.status !== 200) {
        throw new Error("Registration failed");
    }

    return true;
};
