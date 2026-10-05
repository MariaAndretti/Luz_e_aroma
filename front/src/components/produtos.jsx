import React, { useState } from "react";
import api from "../services/api";

export default function Produtos({ produtos, setProdutos }) {
  const [form, setForm] = useState({
    id_produto: null,
    nome: "",
    preco: "",
    quantidade: "",
    fragrancia: "",
  });

  const carregarProdutos = async () => {
    try {
      const response = await api.get("/produto");
      setProdutos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.nome ||
      !form.preco ||
      !form.quantidade ||
      !form.fragrancia
    ) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      if (form.id_produto) {
        await api.put(`/produto/${form.id_produto}`, {
          nome: form.nome,
          preco: form.preco,
          quantidade: form.quantidade,
          fragrancia: form.fragrancia,
        });

        alert("Produto atualizado com sucesso");
      } else {
        await api.post("/produto", {
          nome: form.nome,
          preco: form.preco,
          quantidade: form.quantidade,
          fragrancia: form.fragrancia,
        });

        alert("Produto cadastrado com sucesso");
      }

      await carregarProdutos();

      setForm({
        id_produto: null,
        nome: "",
        preco: "",
        quantidade: "",
        fragrancia: "",
      });
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar produto");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/produto/${id}`);

      alert("Produto excluído com sucesso");

      await carregarProdutos();
    } catch (error) {
      console.log(error);
      alert("Erro ao excluir produto");
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit} className="form-container">

        <div className="form-grid">

          <div className="form-group">
            <label>Nome do Produto *</label>

            <input
              type="text"
              value={form.nome}
              onChange={(e) =>
                setForm({ ...form, nome: e.target.value })
              }
              className="form-input"
              placeholder="Ex: Vela de Baunilha"
            />
          </div>

          <div className="form-group">
            <label>Preço (R$) *</label>

            <input
              type="number"
              step="0.01"
              value={form.preco}
              onChange={(e) =>
                setForm({ ...form, preco: e.target.value })
              }
              className="form-input"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Quantidade *</label>

            <input
              type="number"
              value={form.quantidade}
              onChange={(e) =>
                setForm({ ...form, quantidade: e.target.value })
              }
              className="form-input"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label>Fragrância *</label>

            <input
              type="text"
              value={form.fragrancia}
              onChange={(e) =>
                setForm({ ...form, fragrancia: e.target.value })
              }
              className="form-input"
              placeholder="Ex: Baunilha"
            />
          </div>

        </div>

        <div className="btn-container">

          {form.id_produto && (
            <button
              type="button"
              onClick={() =>
                setForm({
                  id_produto: null,
                  nome: "",
                  preco: "",
                  quantidade: "",
                  fragrancia: "",
                })
              }
              className="btn btn-secondary"
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
          >
            {form.id_produto ? "Salvar" : "Cadastrar"}
          </button>

        </div>

      </form>

      <div className="table-container">

        <table className="custom-table">

          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Fragrância</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>

          <tbody>

            {produtos.map((p) => (
              <tr key={p.id_produto}>

                <td className="text-semibold">
                  {p.nome}
                </td>

                <td>
                  R$ {Number(p.preco).toFixed(2)}
                </td>

                <td>
                  {p.quantidade} un
                </td>

                <td className="text-muted">
                  {p.fragrancia || "Não informada"}
                </td>

                <td className="text-right">

                  <button
                    onClick={() => setForm(p)}
                    className="btn-table-edit"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(p.id_produto)}
                    className="btn-table-delete"
                  >
                    Deletar
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}