import { writable } from "svelte/store";
import type { Message } from "../types";

export const messageStore = writable<Message[]>([]);
