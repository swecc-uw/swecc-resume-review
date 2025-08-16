import api from "./api";

export const getWebSocketToken = async () => {
    const storedToken = localStorage.getItem("ws_token") || "{}";
    const parsedToken = JSON.parse(storedToken);
    if (parsedToken.token && parsedToken.expiry > Date.now()) {
        return parsedToken.token;
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

    localStorage.setItem(
        "ws_token",
        JSON.stringify({
            token,
            expiry: Date.now() + 3600 * 1000, // Token valid for 1 hour
        })
    );
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
