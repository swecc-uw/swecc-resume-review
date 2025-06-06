import api from "./api";

export const getWebSocketToken = async () => {
    if (localStorage.getItem("ws_token")) {
        return localStorage.getItem("ws_token");
    }

    const response = await api.get("/auth/jwt");

    console.log(response);

    if (response.status !== 200) {
        throw new Error(
            `Authentication failed: ${response.data.detail ?? "Unknown error"}`
        );
    }

    const token = response.data.token;

    console.log(response.data.token);
    if (!token) {
        throw new Error("No token received");
    }

    localStorage.setItem("ws_token", token);
    return token;
};

export const getWebSocket = (token: string) => {
    const ws = new WebSocket(`ws://localhost:8004/ws/resume/${token}`);
    ws.onopen = () => {
        console.log("WebSocket connection opened");
    };

    ws.onclose = () => {
        console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    return ws;
};
