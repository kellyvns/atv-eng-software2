import request from "supertest";
import { criarApp } from "../src/app";
import { montarFacade } from "../src/montagem";

describe("API /consultas", () => {
  const app = criarApp(montarFacade());

  const UMA_SEMANA_EM_MS = 7 * 24 * 60 * 60 * 1000;
  const valida = {
    tutor: "Ana",
    telefone: "31999990000",
    pet: "Thor",
    tipo: "CONSULTA",
    dataHora: new Date(Date.now() + UMA_SEMANA_EM_MS).toISOString(),
  };

  it("cria consulta e devolve 201 com valor calculado", async () => {
    const res = await request(app).post("/consultas").send(valida);
    expect(res.status).toBe(201);
    expect(res.body.valor).toBe(120);
    expect(res.body.status).toBe("AGENDADA");
  });

  it("ignora o valor e o status enviados pelo cliente", async () => {
    const res = await request(app)
      .post("/consultas")
      .send({ ...valida, valor: 0, status: "CANCELADA" });
    expect(res.status).toBe(201);
    expect(res.body.valor).toBe(120);
    expect(res.body.status).toBe("AGENDADA");
  });

  it("aceita tutor com exatamente 3 caracteres (limite)", async () => {
    const res = await request(app).post("/consultas").send({ ...valida, tutor: "Bia" });
    expect(res.status).toBe(201);
  });

  it("recusa tutor com 2 caracteres (limite)", async () => {
    const res = await request(app).post("/consultas").send({ ...valida, tutor: "Bi" });
    expect(res.status).toBe(400);
  });

  it("aceita telefone com 10 dígitos (limite)", async () => {
    const res = await request(app).post("/consultas").send({ ...valida, telefone: "3133334444" });
    expect(res.status).toBe(201);
  });

  it("recusa telefone com 9 dígitos", async () => {
    const res = await request(app).post("/consultas").send({ ...valida, telefone: "319999900" });
    expect(res.status).toBe(400);
  });

  it("recusa telefone com 12 dígitos", async () => {
    const res = await request(app).post("/consultas").send({ ...valida, telefone: "319999900001" });
    expect(res.status).toBe(400);
  });

  it("recusa tipo fora do enum ('TOSA')", async () => {
    const res = await request(app).post("/consultas").send({ ...valida, tipo: "TOSA" });
    expect(res.status).toBe(400);
  });

  it("recusa data no passado", async () => {
    const res = await request(app)
      .post("/consultas")
      .send({ ...valida, dataHora: "2020-01-10T14:00:00" });
    expect(res.status).toBe(400);
  });

  it("recusa planoPetMais que não é booleano", async () => {
    const res = await request(app).post("/consultas").send({ ...valida, planoPetMais: "sim" });
    expect(res.status).toBe(400);
  });

  it("lista vários erros quando o corpo está vazio", async () => {
    const res = await request(app).post("/consultas").send({});
    expect(res.status).toBe(400);
    expect(res.body.erros.length).toBeGreaterThanOrEqual(4);
  });

  it("lista as consultas com 200", async () => {
    const res = await request(app).get("/consultas");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("busca uma consulta pelo id", async () => {
    const criada = await request(app).post("/consultas").send(valida);
    const res = await request(app).get(`/consultas/${criada.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.pet).toBe("Thor");
  });

  it("devolve 400 para id não numérico", async () => {
    const res = await request(app).get("/consultas/abc");
    expect(res.status).toBe(400);
  });

  it("devolve 404 para id inexistente", async () => {
    const res = await request(app).get("/consultas/9999");
    expect(res.status).toBe(404);
  });

  it("cancela com 200 e taxa zero quando falta mais de 24h", async () => {
    const criada = await request(app).post("/consultas").send(valida);
    const res = await request(app).delete(`/consultas/${criada.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("CANCELADA");
    expect(res.body.taxaCancelamento).toBe(0);
  });

  it("devolve 409 ao cancelar duas vezes seguidas", async () => {
    const criada = await request(app).post("/consultas").send(valida);
    await request(app).delete(`/consultas/${criada.body.id}`);
    const res = await request(app).delete(`/consultas/${criada.body.id}`);
    expect(res.status).toBe(409);
  });

  it("devolve 404 ao cancelar consulta inexistente", async () => {
    const res = await request(app).delete("/consultas/9999");
    expect(res.status).toBe(404);
  });
});