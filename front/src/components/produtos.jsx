import React from "react";

export default function Produtos({ produtos, onReservar }) {
    return (
        <div className="catalogo">

            <div className="catalogo-topo">
                <h2>Produtos</h2>
                <span>{produtos.length} produtos</span>
            </div>

            <div className="produtos-grid">

                {produtos.map((produto) => (

                    <div
                        className="produto-card"
                        key={produto.id_produto}
                    >

                        <div className="produto-imagem">

                            {produto.imagem ? (
                                <img
                                    src={`/imagens/${produto.imagem}`}
                                    alt={produto.nome}
                                />
                            ) : (
                                <div className="vela">
                                    🕯️
                                </div>
                            )}

                        </div>

                        <div className="produto-info">

                            <h3>
                                {produto.nome}
                            </h3>

                            <p className="fragrancia">
                                Fragrância: {produto.fragrancia}
                            </p>

                            <p className="preco">
                                R$ {Number(produto.preco).toFixed(2)}
                            </p>

                            <p className="quantidade">
                                {produto.quantidade} unidades disponíveis
                            </p>

                            <button
                                className="btn-reservar"
                                onClick={() => onReservar(produto)}
                            >
                                Reservar
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}