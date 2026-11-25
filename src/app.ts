import express, { NextFunction, Request, Response } from "express";
import { ClinicaFacade } from "./facade/ClinicaFacade";
import { ConsultaJaCanceladaError, ConsultaNaoEncontradaError } from "./domain/erros";
import { validarNovaConsulta } from "./api/validacao";

const ID_NUMERICO = /^\d+$/;

export function criarApp(facade: ClinicaFacade) {
  const app = express();
  app.use(express.json());

  app.post("/consultas", (req: Request, res: Response) => {
    const resultado = validarNovaConsulta(req.body);
    if (!resultado.valido) {
      res.status(400).json({ erros: resultado.erros });
      return;
    }
    res.status(201).json(facade.agendar(resultado.dados));
  });

  app.get("/consultas", (_req: Request, res: Response) => {
    res.status(200).json(facade.listar());
  });

  app.get("/consultas/:id", (req: Request, res: Response) => {
    const id = lerId(req.params.id);
    if (id === undefined) {
      res.status(400).json({ erros: ["id deve ser numérico."] });
      return;
    }
    const consulta = facade.buscarPorId(id);
    if (!consulta) {
      res.status(404).json({ erros: [`Consulta ${id} não encontrada.`] });
      return;
    }
    res.status(200).json(consulta);
  });

  app.delete("/consultas/:id", (req: Request, res: Response) => {
    const id = lerId(req.params.id);
    if (id === undefined) {
      res.status(400).json({ erros: ["id deve ser numérico."] });
      return;
    }
    try {
      res.status(200).json(facade.cancelar(id));
    } catch (erro) {
      if (erro instanceof ConsultaNaoEncontradaError) {
        res.status(404).json({ erros: [erro.message] });
      } else if (erro instanceof ConsultaJaCanceladaError) {
        res.status(409).json({ erros: [erro.message] });
      } else {
        throw erro;
      }
    }
  });

  app.use((erro: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
    const status = erro.status ?? 500;
    res.status(status).json({
      erros: [status === 500 ? "Erro interno no servidor." : "Corpo da requisição inválido."],
    });
  });

  return app;
}

function lerId(texto: string | string[]): number | undefined {
  return typeof texto === "string" && ID_NUMERICO.test(texto) ? Number(texto) : undefined;
}