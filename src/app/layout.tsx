import '@mantine/core/styles.css'; // <-- Importa el CSS de Mantine
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Ruth Decoraciones', // <-- Cambia el título
  description: 'Decoración para eventos, arcos y más.', // <-- Cambia la descripción
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
       <ColorSchemeScript defaultColorScheme="auto" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="auto"> {/* <-- Envuelve a 'children' */}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}