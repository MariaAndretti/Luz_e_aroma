import React, { useState, useEffect } from "react";

import api from "./services/api";

import Produtos from "./components/produtos";
import Reservas from "./components/reserva";

export default function App() {
  const [activeTab, setActiveTab] = useState("produtos");
  const [produtos, setProdutos] = useState([]);
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

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
              setProdutos={setProdutos}
            />
          )}

          {activeTab === "reservas" && (
            <Reservas
              produtos={produtos}
              reservas={reservas}
              setReservas={setReservas}
            />
          )}

        </main>

      </div>

    </div>
  );
}