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
                id_produto: produtoSelecionado.id_produto,
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


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (
            !form.id_produto ||
            !form.quantidade ||
            !form.data_reserva
        ) {

            alert("Preencha todos os campos");

            return;

        }


        try {

            await api.post("/reserva", {

                id_produto: form.id_produto,

                quantidade: form.quantidade,

                fragrancia: form.fragrancia,

                data_reserva: form.data_reserva

            });


            alert("Reserva realizada com sucesso");


            await carregarReservas();


            setForm({

                id_produto: "",

                quantidade: "",

                fragrancia: "",

                data_reserva: ""

            });


        } catch (error) {

            console.log(error);

            alert("Erro ao realizar reserva");

        }

    };


    const handleDelete = async (id) => {

        try {

            await api.delete(`/reserva/${id}`);


            alert("Reserva excluída com sucesso");


            await carregarReservas();


        } catch (error) {

            console.log(error);

            alert("Erro ao excluir reserva");

        }

    };


    return (

        <div>


            {/* FORMULÁRIO */}

            <form
                onSubmit={handleSubmit}
                className="form-container"
            >

                <div className="form-grid">


                    {/* PRODUTO */}

                    <div className="form-group">

                        <label>
                            Produto *
                        </label>


                        <select
                            value={form.id_produto}
                            onChange={(e) => {

                                const produto = produtos.find(
                                    (p) =>
                                        p.id_produto === Number(
                                            e.target.value
                                        )
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


                    {/* QUANTIDADE */}

                    <div className="form-group">

                        <label>
                            Quantidade *
                        </label>


                        <input
                            type="number"
                            min="1"
                            value={form.quantidade}
                            onChange={(e) =>
                                setForm({

                                    ...form,

                                    quantidade: e.target.value

                                })
                            }
                            className="form-input"
                            placeholder="1"
                        />

                    </div>


                    {/* DATA */}

                    <div className="form-group">

                        <label>
                            Data da Reserva *
                        </label>


                        <input
                            type="date"
                            value={form.data_reserva}
                            onChange={(e) =>
                                setForm({

                                    ...form,

                                    data_reserva: e.target.value

                                })
                            }
                            className="form-input"
                        />

                    </div>


                </div>


                {/* BOTÃO */}

                <div className="btn-container">

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >

                        Fazer Reserva

                    </button>

                </div>

            </form>


            {/* TABELA */}

            <div className="table-container">

                <table className="custom-table">


                    <thead>

                        <tr>

                            <th>
                                Produto
                            </th>

                            <th>
                                Quantidade
                            </th>

                            <th>
                                Fragrância
                            </th>

                            <th>
                                Data
                            </th>

                            <th className="text-right">
                                Ações
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {reservas.map((reserva) => {


                            const produto = produtos.find(
                                (p) =>
                                    p.id_produto ===
                                    reserva.id_produto
                            );


                            return (

                                <tr
                                    key={reserva.id_reserva}
                                >


                                    <td className="text-semibold">

                                        {produto
                                            ? produto.nome
                                            : `Produto ${reserva.id_produto}`}

                                    </td>


                                    <td>

                                        {reserva.quantidade} un

                                    </td>


                                    <td className="text-muted">

                                        {reserva.fragrancia}

                                    </td>


                                    <td>

                                        {reserva.data_reserva
                                            ? new Date(
                                                reserva.data_reserva
                                            ).toLocaleDateString(
                                                "pt-BR"
                                            )
                                            : ""}

                                    </td>


                                    <td className="text-right">

                                        <button
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

                    </tbody>

                </table>

            </div>


        </div>

    );

}