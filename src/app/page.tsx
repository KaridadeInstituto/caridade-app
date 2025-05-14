"use client";

import { useState } from "react";

export default function Checkout() {
  const [userData, setUserData] = useState({ name: "", email: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: any ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Pagamento realizado com sucesso!");
      } else {
        setMessage("Erro no pagamento: " + data.error);
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold">Checkout</h1>
      <input name="name" placeholder="Nome" className="border p-2 m-2" onChange={handleChange} />
      <input name="email" placeholder="Email" className="border p-2 m-2" onChange={handleChange} />
      <input name="amount" placeholder="Valor (R$)" type="number" className="border p-2 m-2" onChange={handleChange} />

      <button onClick={handlePayment} className="bg-blue-500 text-white p-2 rounded">
        {loading ? "Processando..." : "Pagar"}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}