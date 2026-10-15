
import React, { useState, useEffect } from "react";
import api from "./services/api";
import Produtos from "./components/produtos";
import Reservas from "./components/reserva";

export default function App() {
    const [logado, setLogado] = useState(false);
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    
    const [activeTab, setActiveTab] = useState("produtos");
    const [produtos, setProdutos] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    
    useEffect(() => {
        carregarDados();
    }, []);
    
    async function carregarDados() {
        try {
            const respostaProdutos = await api.get("/produto");
            setProdutos(respostaProdutos.data);
            
            if (logado) {
                const respostaReservas = await api.get("/reserva");
                setReservas(respostaReservas.data);
            }
        } catch (error) {
            console.log("Erro ao buscar dados:", error);
        }
    }
    
    async function carregarReservas() {
        try {
            const resposta = await api.get("/reserva");
            setReservas(resposta.data);
        } catch (error) {
            console.log("Erro ao buscar reservas:", error);
        }
    }
    
    function reservar(produto) {
        setProdutoSelecionado(produto);
        setActiveTab("reservas");
        
        if (!logado) {
            setMostrarLogin(true);
        } else {
            carregarReservas();
        }
    }
    
    function entrar(e) {
        e.preventDefault();
        
        if (!email.trim() || !senha) {
            alert("Preencha o e-mail e a senha.");
            return;
        }
        
        setLogado(true);
        setMostrarLogin(false);
        carregarReservas();
    }
    
    function sair() {
        setLogado(false);
        setMostrarLogin(false);
        setActiveTab("produtos");
        setProdutoSelecionado(null);
        setEmail("");
        setSenha("");
    }
    
    if (mostrarLogin) {
        return (
            <div className="login-container">
            <div className="login-box">
            <h1>Luz & Aroma</h1>
            <p>Entre para realizar sua reserva</p>
            
            <form onSubmit={entrar}>
            <div className="form-group">
            <label>E-mail</label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            placeholder="Digite seu e-mail"
            required
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
            required
            />
            </div>
            
            <button type="submit" className="btn btn-primary">
            Continuar
            </button>
            
            <button
            type="button"
            className="btn btn-voltar"
            onClick={() => setMostrarLogin(false)}
            >
            Voltar ao catálogo
            </button>
            </form>
            </div>
            </div>
        );
    }
    
    return (
        <div className="app-container">
        <aside className="sidebar">
        <div className="sidebar-title">Luz & Aroma</div>
        
        <nav className="sidebar-nav">
        <button
        className={`nav-button ${
            activeTab === "produtos" ? "active" : ""
        }`}
        onClick={() => setActiveTab("produtos")}
        >
        Produtos
        </button>
        
        {logado && (
            <button
            className={`nav-button ${
                activeTab === "reservas" ? "active" : ""
            }`}
            onClick={() => {
                setActiveTab("reservas");
                setProdutoSelecionado(null);
                carregarReservas();
            }}
            >
            Reservas
            </button>
        )}
        </nav>
        </aside>
        
        <div className="main-content">
        <header className="header">
        <h2 className="header-title">
        {activeTab === "produtos"
            ? "Catálogo de Produtos"
            : "Reservas"}
            </h2>
            
            <div className="user-info">
            {logado ? (
                <button className="btn-sair" onClick={sair}>
                Sair
                </button>
            ) : (
                "Bem-vindo à Luz & Aroma"
            )}
            </div>
            </header>
            
            <main className="content-body">
            {activeTab === "produtos" && (
                <Produtos
                produtos={produtos}
                onReservar={reservar}
                />
            )}
            
            {activeTab === "reservas" && logado && (
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
    