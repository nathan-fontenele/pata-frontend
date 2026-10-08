"use client";

import { useEffect, useState } from "react";

type Organization = { nome?: string | null };

export default function OrganizationStatus() {
  const [organizationName, setOrganizationName] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;

    fetch("/api/backend/api/organizacao", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("A organização não está disponível.");
        return (await response.json()) as Organization;
      })
      .then((organization) => {
        if (!active) return;
        setOrganizationName(organization.nome ?? null);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return <p className="dashboard-notice" role="status">Carregando organização...</p>;
  }

  if (status === "error") {
    return (
      <p className="dashboard-notice" role="status">
        Não foi possível carregar uma organização para esta conta. Confirme se o acesso já está vinculado a uma clínica.
      </p>
    );
  }

  return organizationName ? (
    <p className="dashboard-org">Organização: <strong>{organizationName}</strong></p>
  ) : null;
}
