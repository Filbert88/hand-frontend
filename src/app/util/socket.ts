export const createWebSocket = (url: string) => {
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log("Connected to WebSocket");
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket");
  };

  ws.onerror = (error) => {
    console.log("WebSocket error: ", error);
  };

  return ws;
};
