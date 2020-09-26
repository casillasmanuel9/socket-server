import { usuariosConectados } from './../sockets/sockets';
import { Socket } from 'socket.io';
import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { GraficaDate } from '../classes/grafica';

const router = Router();

const grafica = new GraficaDate();

router.get("/grafica", (req: Request, res: Response) => {
  res.json(grafica.getDataGrafica());
});

router.post("/grafica", (req: Request, res: Response) => {
  const mes = req.body.mes;
  const unidades = Number(req.body.unidades);

  console.log(mes, unidades);

  grafica.incrementar(mes, unidades); 


  const server = Server.instance;
  server.io.emit("cambios-grafica", grafica.getDataGrafica());

  res.json( grafica.getDataGrafica() );
});

router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "Todo esta bien",
  });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;
  server.io.emit("mensaje-nuevo", payload);

  res.json({
    ok: true,
    mensaje: "Mensaje Post listo",
    cuerpo,
    de,
  });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo,
  };
  const server = Server.instance;

  server.io.in(id).emit("mensaje-privado", payload);

  res.json({
    ok: true,
    mensaje: "Mensaje Post listo",
    cuerpo,
    de,
    id,
  });
});

// Servicio para obtener todos los IDs de los usuarios
router.get("/usuarios", (req: Request, res: Response) => {
  
  const server = Server.instance;

  server.io.clients((err: any, clientes: string[]) =>{
    if(err) res.json({ok: false, err});

    res.json({ok: true, clientes})
  });

});

// Obtener usuarios y sus nombres
router.get("/usuarios/detalle", (req: Request, res: Response) => {
    res.json({ok: true, clientes: usuariosConectados.getLista()})
});

export default router;
