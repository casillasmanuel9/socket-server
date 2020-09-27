import { SERVER_PORT } from "./../global/enviroment";
import express from "express";
import socketIO from "socket.io";
import http from "http";
import * as sokect from '../sockets/sockets';

export default class Server {
  private static _instance: Server;

  public app: express.Application;
  public port: number;
  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    console.log("Escuchando conexiones");
    this.io.on("connection", (cliente) => {

      //Conectar Cliente
      sokect.conectarCliente(cliente);

      // Configuracion de mapas
      sokect.mapaSockets(cliente, this.io);

      //Configurar Usuario
      sokect.configurarUsuario(cliente, this.io);

      // Obtener usuarios Activos
      sokect.obtenerUsuarios(cliente,this.io);
      
      console.log(cliente.id);
      sokect.mensaje(cliente, this.io);
      sokect.desconectar(cliente, this.io);
    });
  }

  start(callback: VoidFunction) {
    this.httpServer.listen(this.port, callback);
  }
}
