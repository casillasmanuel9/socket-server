import { UsuariosLista } from './../classes/usuarios-lista';
import { Socket } from "socket.io";
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
    
}

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
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

        io.emit('usuarios-activos', usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje:`Usuario ${payload.nombre}, configurado`
        });
    });
}

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('obtener-usaurios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}