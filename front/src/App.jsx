import React, { useState, useEffect } from "react";
import api from "./services/api";
import Produtos from "./components/produtos";
import Reservas from "./components/reserva";

export default function App() {
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [activeTab, setActiveTab] = useState("produtos");
  const [produtos, setProdutos] = useState([]);
  const [reservas, setReservas] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    if (logado) {
      carregarDados();
    }
  }, [logado]);

  async function carregarDados() {
    try {
      const produtos = await api.get("/produto");
      const reservas = await api.get("/reserva");

      setProdutos(produtos.data);
      setReservas(reservas.data);
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
    }
  }

  function entrar(e) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha o e-mail e a senha");
      return;
    }

    setLogado(true);
  }

  function reservar(produto) {
    setProdutoSelecionado(produto);
    setActiveTab("reservas");
  }

  if (!logado) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Luz & Aroma</h1>
          <p>Sistema de Controle</p>

          <form onSubmit={entrar}>
            <div className="form-group">
              <label>E-mail</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="form-group">
              <label>Senha</label>

              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="form-input"
                placeholder="Digite sua senha"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-title">
          Luz & Aroma
        </div>

        <nav className="sidebar-nav">
          <button
            onClick={() => setActiveTab("produtos")}
            className={`nav-button ${
              activeTab === "produtos" ? "active" : ""
            }`}
          >
            Produtos
          </button>

          <button
            onClick={() => setActiveTab("reservas")}
            className={`nav-button ${
              activeTab === "reservas" ? "active" : ""
            }`}
          >
            Reservas
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h2 className="header-title">
            {activeTab === "produtos"
              ? "Mostruário de Produtos"
              : "Reservas"}
          </h2>

          <div className="user-info">
            Luz & Aroma
          </div>
        </header>

        <main className="content-body">
          {activeTab === "produtos" && (
            <Produtos
              produtos={produtos}
              onReservar={reservar}
            />
          )}

          {activeTab === "reservas" && (
            <Reservas
              produtos={produtos}
              reservas={reservas}
              setReservas={setReservas}
              produtoSelecionado={produtoSelecionado}
            />
          )}
        </main>
      </div>
    </div>
  );
}