
import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function Reservas({
    produtos,
    reservas,
    setReservas,
    produtoSelecionado
}) {
    const [form, setForm] = useState({
        id_produto: "",
        quantidade: "",
        fragrancia: "",
        data_reserva: ""
    });
    
    useEffect(() => {
        if (produtoSelecionado) {
            setForm({
                id_produto: String(produtoSelecionado.id_produto),
                quantidade: "",
                fragrancia: produtoSelecionado.fragrancia,
                data_reserva: ""
            });
        }
    }, [produtoSelecionado]);
    
    const carregarReservas = async () => {
        try {
            const response = await api.get("/reserva");
            setReservas(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const produtoAtual = produtos.find(
        (p) => Number(p.id_produto) === Number(form.id_produto)
    );
    
    const valorTotal = produtoAtual
    ? Number(produtoAtual.preco) * Number(form.quantidade || 0)
    : 0;
    
    const formatarMoeda = (valor) =>
        Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.id_produto || !form.quantidade || !form.data_reserva) {
            alert("Preencha todos os campos");
            return;
        }
        
        if (
            !Number.isInteger(Number(form.quantidade)) ||
            Number(form.quantidade) < 1
        ) {
            alert("Informe uma quantidade válida.");
            return;
        }
        
        try {
            await api.post("/reserva", {
                id_produto: Number(form.id_produto),
                quantidade: Number(form.quantidade),
                data_reserva: form.data_reserva
            });
            
            alert("Reserva realizada com sucesso!");
            
            await carregarReservas();
            
            setForm({
                id_produto: "",
                quantidade: "",
                fragrancia: "",
                data_reserva: ""
            });
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.mensagem ||
                "Erro ao realizar reserva."
            );
        }
    };
    
    const handleDelete = async (id) => {
        try {
            await api.delete(`/reserva/${id}`);
            alert("Reserva excluída com sucesso!");
            await carregarReservas();
        } catch (error) {
            console.log(error);
            alert("Erro ao excluir reserva.");
        }
    };
    
    return (
        <div>
        <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
        <div className="form-group">
        <label>Produto *</label>
        
        <select
        value={form.id_produto}
        onChange={(e) => {
            const produto = produtos.find(
                (p) =>
                    Number(p.id_produto) ===
                Number(e.target.value)
            );
            
            setForm({
                ...form,
                id_produto: e.target.value,
                fragrancia: produto
                ? produto.fragrancia
                : ""
            });
        }}
        className="form-input"
        required
        >
        <option value="">
        Selecione um produto
        </option>
        
        {produtos.map((produto) => (
            <option
            key={produto.id_produto}
            value={produto.id_produto}
            >
            {produto.nome}
            </option>
        ))}
        </select>
        </div>
        
        <div className="form-group">
        <label>Quantidade *</label>
        
        <input
        type="number"
        min="1"
        max={produtoAtual?.quantidade}
        value={form.quantidade}
        onChange={(e) =>
            setForm({
                ...form,
                quantidade: e.target.value
            })
        }
        className="form-input"
        placeholder="1"
        required
        />
        
        {produtoAtual && (
            <small>
            Disponíveis: {produtoAtual.quantidade} unidades
            </small>
        )}
        </div>
        
        <div className="form-group">
        <label>Fragrância</label>
        
        <input
        type="text"
        value={form.fragrancia}
        className="form-input"
        readOnly
        />
        </div>
        
        <div className="form-group">
        <label>Data da Reserva *</label>
        
        <input
        type="date"
        value={form.data_reserva}
        min={new Date().toLocaleDateString("en-CA")}
        onChange={(e) =>
            setForm({
                ...form,
                data_reserva: e.target.value
            })
        }
        className="form-input"
        required
        />
        </div>
        </div>
        
        <div className="valor-total">
        <span>Valor total</span>
        <strong>{formatarMoeda(valorTotal)}</strong>
        </div>
        
        <div className="btn-container">
        <button
        type="submit"
        className="btn btn-primary"
        >
        Fazer Reserva
        </button>
        </div>
        </form>
        
        <div className="table-container">
        <table className="custom-table">
        <thead>
        <tr>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Fragrância</th>
        <th>Data</th>
        <th>Valor total</th>
        <th className="text-right">Ações</th>
        </tr>
        </thead>
        
        <tbody>
        {reservas.map((reserva) => {
            const produto = produtos.find(
                (p) =>
                    Number(p.id_produto) ===
                Number(reserva.id_produto)
            );
            
            return (
                <tr key={reserva.id_reserva}>
                <td className="text-semibold">
                {produto
                    ? produto.nome
                    : `Produto ${reserva.id_produto}`}
                    </td>
                    
                    <td>{reserva.quantidade} un</td>
                    
                    <td className="text-muted">
                    {reserva.fragrancia}
                    </td>
                    
                    <td>
                    {reserva.data_reserva
                        ? new Date(
                            reserva.data_reserva
                        ).toLocaleDateString("pt-BR")
                        : ""}
                        </td>
                        
                        <td>
                        {formatarMoeda(reserva.valor_total)}
                        </td>
                        
                        <td className="text-right">
                        <button
                        type="button"
                        onClick={() =>
                            handleDelete(
                                reserva.id_reserva
                            )
                        }
                        className="btn-table-delete"
                        >
                        Deletar
                        </button>
                        </td>
                        </tr>
                    );
                })}
                
                {reservas.length === 0 && (
                    <tr>
                    <td colSpan="6">
                    Nenhuma reserva realizada.
                    </td>
                    </tr>
                )}
                </tbody>
                </table>
                </div>
                </div>
            );
        }
        