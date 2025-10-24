import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Registro from "../src/pages/Registro";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Inicio from "../src/pages/Inicio";

describe("Registro Component", () => {

    // Caso feliz de renderizado: verifica que el título del formulario aparece en el DOM.
    it("renders registration form", () => {
        render(<AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Inicio />} />
                        </Routes>
                        <Registro/>
                </BrowserRouter>
            </AuthProvider>);
            expect(screen.getByText("Registro de Usuario")).toBeInTheDocument();
    });

    // Flujo de llenado y envío: completa todos los campos válidos y hace submit.
    // Este test asegura que los inputs actualizan su valor y el botón dispara el submit.
    it("Permite al usuario llenar y enviar el formulario", () => {
        render(<AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Inicio />} />
                        </Routes>
                        <Registro/>
                </BrowserRouter>
            </AuthProvider>);
            
            // Obtener inputs por su placeholder para simular interacción de usuario real.
            const nombre = screen.getByPlaceholderText("Ingrese su nombre completo");
            const rut = screen.getByPlaceholderText("Ingrese su RUT");
            const correo = screen.getByPlaceholderText("Ingrese su correo electrónico");
            const telefono = screen.getByPlaceholderText("Ingrese su número de teléfono");
            const password = screen.getByPlaceholderText("Ingrese su contraseña");
            const confirmPassword = screen.getByPlaceholderText("Confirme su contraseña");

            // Completar cada campo con valores válidos.
            fireEvent.change(nombre, { target: { value: "Javier Pena" } });
            fireEvent.change(rut, { target: { value: "12345678-9" } });
            fireEvent.change(correo, { target: { value: "javier.pena@example.com" } });
            fireEvent.change(telefono, { target: { value: "987654321" } });
            fireEvent.change(password, { target: { value: "password123" } });
            fireEvent.change(confirmPassword, { target: { value: "password123" } });

            // Enviar el formulario.
            fireEvent.click(screen.getByText("Registrarse"));

            // Asegurarnos de que los inputs mantuvieron el valor asignado.
            expect(nombre).toHaveValue("Javier Pena");
            expect(correo).toHaveValue("javier.pena@example.com");
            expect(password).toHaveValue("password123");
            expect(confirmPassword).toHaveValue("password123");
    });

    // Validación: Si se envía vacío, debe mostrar un mensaje de "campos incompletos".
    it("Muestra errores cuando se envíe el formulario incompleto", () => { 
        render(<AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Inicio />} />
                        </Routes>
                        <Registro/>
                </BrowserRouter>
            </AuthProvider>);

            fireEvent.click(screen.getByText("Registrarse"));
            expect(screen.getByText("Por favor, complete todos los campos.")).toBeInTheDocument();
    });

    // Validación: Contraseña demasiado corta (< 8) debe mostrar el mensaje correspondiente.
    it("Muestra error cuando la contraseña es corta", async () => { 
        render(<AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Inicio />} />
                        </Routes>
                        <Registro/>
                </BrowserRouter>
            </AuthProvider>);

            // Completar entradas mínimas requeridas con una contraseña corta.
            fireEvent.change(screen.getByPlaceholderText("Ingrese su nombre completo"), { 
                target: { value: "Javier Pena" },
            });
    
            fireEvent.change(screen.getByPlaceholderText("Ingrese su RUT"), {
                target: { value: "12345678-9" },
            });
    
            fireEvent.change(screen.getByPlaceholderText("Ingrese su correo electrónico"),
            { target: { value: "javier.pena@example.com" } }
            );
    
            fireEvent.change(screen.getByPlaceholderText("Ingrese su número de teléfono"),
            { target: { value: "987654321" } }
            );
    
            fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
                target: { value: "123" },
        });
    
        fireEvent.change(screen.getByPlaceholderText("Confirme su contraseña"), {
            target: { value: "123" },
        });

        fireEvent.click(screen.getByText("Registrarse"));
        expect(await screen.findByText("La contraseña debe tener al menos 8 caracteres.")).toBeInTheDocument();
    });

    // Validación: Contraseñas distintas deben mostrar "no coinciden".
    it("Muestra error cuando las contraseñas no coinciden", async () => { 
        render(<AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Inicio />} />
                        </Routes>
                        <Registro/>
                </BrowserRouter>
            </AuthProvider>);

            // Completar entradas con contraseñas diferentes.
            fireEvent.change(screen.getByPlaceholderText("Ingrese su nombre completo"), { 
                target: { value: "Javier Pena" },
            });
    
            fireEvent.change(screen.getByPlaceholderText("Ingrese su RUT"), {
                target: { value: "12345678-9" },
            });
    
            fireEvent.change(screen.getByPlaceholderText("Ingrese su correo electrónico"),
            { target: { value: "javier.pena@example.com" } }
            );
    
            fireEvent.change(screen.getByPlaceholderText("Ingrese su número de teléfono"),
            { target: { value: "987654321" } }
            );
    
            fireEvent.change(screen.getByPlaceholderText("Ingrese su contraseña"), {
                target: { value: "password123" },
        });
    
        fireEvent.change(screen.getByPlaceholderText("Confirme su contraseña"), {
            target: { value: "password12345" },
        });

        fireEvent.click(screen.getByText("Registrarse"));
        expect(await screen.findByText("Las contraseñas no coinciden.")).toBeInTheDocument();
    });
});