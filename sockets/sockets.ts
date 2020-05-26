import { UsuariosLista } from './../classes/usuarios-lista';
import { Socket } from "socket.io";
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
        console.log(`Mensjae Recivido de ${payload.de} : ${payload.cuerpo}`);

        io.emit('mensaje-nuevo',payload);
    });
}

// Escuchar mensajes
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('consfigurar-usaurio', (payload: {nombre: string}, callback:Function) => {
        usuariosConectados.actualizarUsuario(cliente.id, payload.nombre);
        callback({
            ok: true,
            mensaje:`Usuario ${payload.nombre}, configurado`
        });
    });
}