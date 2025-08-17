import { writable } from "svelte/store";
import type { Member } from "../types";
import { getCurrentUser } from "./member";
import { redirect } from "@sveltejs/kit";
import { goto } from "$app/navigation";
import { base } from "$app/paths";

// Create a writable store for the current user
export const currentUser = writable<Member | null>(null);

// Function to load the current user
export const loadCurrentUser = async () => {
    try {
        const user = await getCurrentUser();
        currentUser.set(user);
        return user;
    } catch (error) {
        currentUser.set(null);
        return null;
    }
};

// Function to clear the current user (for logout)
export const clearCurrentUser = () => {
    currentUser.set(null);
};
