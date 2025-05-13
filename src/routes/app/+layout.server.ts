import { redirect } from "@sveltejs/kit";
import { LOCAL_API_ENDPOINT, PROD_API_ENDPOINT } from "../../constants";
import type { LoadEvent } from "@sveltejs/kit";
import { devPrint } from "../../utils";
import type { Member } from "../../types";
import { base } from "$app/paths";

export async function load({ fetch }: LoadEvent) {
    const baseURL = import.meta.env.DEV
        ? LOCAL_API_ENDPOINT
        : PROD_API_ENDPOINT;
    const response = await fetch(`${baseURL}/members/profile`);

    if (!response.ok) {
        throw redirect(302, `${base}/login`);
    }

    const data = await response.json();
    devPrint("User Data: ", data);

    return {
        user: data as Member,
    };
}
