"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingForm({
  initialEmail,
}: {
  initialEmail: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [slug, setSlug] = useState("");

  function updateClinicName(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    setClinicName(name);
    setSlug(name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      nome: String(formData.get("nome") ?? "").trim(),
      slug: String(formData.get("slug") ?? "").trim(),
      cnpj: String(formData.get("cnpj") ?? "").replace(/\D/g, ""),
      email: String(formData.get("email") ?? "").trim(),
    };
    try {
      const response = await fetch("/api/backend/api/organizacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 429) {
          setError("Limite de cadastros atingido para este IP. Aguarde 15 minutos antes de tentar novamente.");
          return;
        }

        const body = await response.json().catch(() => null);
        setError(
          body?.detail || body?.title || body?.message ||
            "Não foi possível concluir o cadastro. Confira os dados e tente novamente.",
        );
        return;
      }

      router.push("/dashboard?cadastro=concluido");
      router.refresh();
    } catch {
      setError("Não foi possível conectar à API. Tente novamente em instantes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="onboarding-form" onSubmit={submit}>
      <label>
        Nome da clínica
        <input name="nome" value={clinicName} onChange={updateClinicName} autoComplete="organization" required />
      </label>
      <label>
        Identificador da clínica
        <input name="slug" value={slug} onChange={(event) => setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} required />
      </label>
      <label>
        CNPJ
        <input name="cnpj" inputMode="numeric" autoComplete="off" placeholder="Somente números ou com pontuação" required />
      </label>
      <label>
        E-mail
        <input name="email" type="email" defaultValue={initialEmail} autoComplete="email" required />
      </label>
      <p className="onboarding-help">
        O slug cria o endereço de identificação da clínica. Ele é preenchido com base no nome e pode ser ajustado.
      </p>

      {error && <p className="configuration-error" role="alert">{error}</p>}
      <button className="auth-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando clínica..." : "Cadastrar clínica"}
        {!isSubmitting && <span aria-hidden="true">→</span>}
      </button>
    </form>
  );
}
