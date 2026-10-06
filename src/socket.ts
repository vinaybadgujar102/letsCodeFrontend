import { io } from "socket.io-client";

import { SOCKET_SERVICE_URL } from "./config/api";

const URL = SOCKET_SERVICE_URL;

export const socket = io(URL);
