import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import Cotizacion from "../src/pages/Cotizacion";

// Mock del UI del carrito para no renderizar nada complejo
vi.mock("../src/components/ui/Carrito", () => ({
    default: () => <div data-testid="carrito" />,
}));

// Mock del hook useCarrito para no depender del provider
let mockItems = [];
const mockFns = { quitarItem: vi.fn() };

vi.mock("../src/context/CarritoContext", () => ({
    useCarrito: () => ({ items: mockItems, quitarItem: mockFns.quitarItem }),
}));

const renderUI = () =>
    render(
        <BrowserRouter>
            <Cotizacion />
        </BrowserRouter>
    );

describe("Cotizacion Component (sin provider de carrito)", () => {
    let alertSpy;

    beforeEach(() => {
        mockItems = []; // reset por defecto: carrito vacío
        vi.clearAllMocks();
        alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    it("renderiza el formulario de cotización", () => {
        renderUI();

        expect(screen.getByText("🛒 Carro de Cotización")).toBeInTheDocument();
        expect(screen.getByLabelText("Nombre o Razón Social")).toBeInTheDocument();
        expect(screen.getByText("Enviar")).toBeInTheDocument();
    });

    it("muestra error cuando se envía el formulario vacío", async () => {
        renderUI();

        fireEvent.click(screen.getByText("Enviar"));
        expect(
        await screen.findByText("Por favor, complete todos los campos requeridos.")
        ).toBeInTheDocument();
    });

    it("muestra error cuando el carrito está vacío", async () => {
        // mockItems sigue vacío
        renderUI();

        fireEvent.change(screen.getByLabelText("Nombre o Razón Social"), {
        target: { value: "Empresa SPA" },
        });
        fireEvent.change(screen.getByLabelText("RUT"), {
        target: { value: "12345678-9" },
        });
        fireEvent.change(screen.getByLabelText("Número de contacto"), {
        target: { value: "912345678" },
        });
        fireEvent.change(screen.getByLabelText("E-Mail"), {
        target: { value: "empresa@correo.cl" },
        });
        fireEvent.change(screen.getByLabelText("Región donde opera"), {
        target: { value: "Metropolitana de Santiago" },
        });

        const todayStr = new Date().toISOString().slice(0, 10);
        fireEvent.change(screen.getByLabelText("Fecha de inicio Estimada"), {
        target: { value: todayStr },
        });

        fireEvent.click(screen.getByText("Enviar"));
        expect(
        await screen.findByText("Agregue al menos un equipo al carrito para cotizar.")
        ).toBeInTheDocument();
    });

    it("muestra error cuando la fecha es anterior a hoy", async () => {
        mockItems = [{ lineaId: "1", id: 1, nombre: "Equipo", marca: "X" }];
        renderUI();

        fireEvent.change(screen.getByLabelText("Nombre o Razón Social"), {
        target: { value: "Empresa SPA" },
        });
        fireEvent.change(screen.getByLabelText("RUT"), {
        target: { value: "12345678-9" },
        });
        fireEvent.change(screen.getByLabelText("Número de contacto"), {
        target: { value: "912345678" },
        });
        fireEvent.change(screen.getByLabelText("E-Mail"), {
        target: { value: "empresa@correo.cl" },
        });
        fireEvent.change(screen.getByLabelText("Región donde opera"), {
        target: { value: "Metropolitana de Santiago" },
        });

        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        const ayerStr = ayer.toISOString().slice(0, 10);

        fireEvent.change(screen.getByLabelText("Fecha de inicio Estimada"), {
        target: { value: ayerStr },
        });

        fireEvent.click(screen.getByText("Enviar"));
        expect(
        await screen.findByText(
            "La fecha de inicio estimada no puede ser anterior a hoy."
        )
        ).toBeInTheDocument();
    });

    it("permite enviar con datos correctos y muestra éxito", () => {
        mockItems = [{ lineaId: "1", id: 1, nombre: "Equipo", marca: "X" }];
        renderUI();

        fireEvent.change(screen.getByLabelText("Nombre o Razón Social"), {
        target: { value: "Empresa SPA" },
        });
        fireEvent.change(screen.getByLabelText("RUT"), {
        target: { value: "12345678-9" },
        });
        fireEvent.change(screen.getByLabelText("Número de contacto"), {
        target: { value: "912345678" },
        });
        fireEvent.change(screen.getByLabelText("E-Mail"), {
        target: { value: "empresa@correo.cl" },
        });
        fireEvent.change(screen.getByLabelText("Región donde opera"), {
        target: { value: "Metropolitana de Santiago" },
        });

        const todayStr = new Date().toISOString().slice(0, 10);
        fireEvent.change(screen.getByLabelText("Fecha de inicio Estimada"), {
        target: { value: todayStr },
        });

        fireEvent.click(screen.getByText("Enviar"));
        expect(alertSpy).toHaveBeenCalledWith(
        "Solicitud de cotización enviada. ¡Te contactaremos pronto!"
        );
    });
});