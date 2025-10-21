'use client'; // <-- Fundamental. Los formularios son interactivos.

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, FileInput, Textarea, Box, LoadingOverlay, Alert } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import { z } from 'zod'; // Para validación

// 1. Definimos el esquema de validación con Zod
const schema = z.object({
  nombre: z.string().min(2, { message: 'Tu nombre es requerido' }),
  email: z.string().email({ message: 'Email inválido' }),
  fechaEvento: z.date().nullable(),
  detalles: z.string().min(10, { message: 'Cuéntanos un poco más' }),
  inspiracion: z.custom<File | null>(
    (file) => file instanceof File && file.size < 5000000, // Límite de 5MB
    { message: 'El archivo es muy grande (máx 5MB)' }
  ).nullable(),
});

export function FormularioPedido() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      nombre: '',
      email: '',
      fechaEvento: null,
      detalles: '',
      inspiracion: null,
    },
  });

  // 4. Función que se ejecuta al enviar
  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // ¡Aquí es donde enviaremos los datos al backend!
    const formData = new FormData();
    formData.append('nombre', values.nombre);
    formData.append('email', values.email);
    formData.append('detalles', values.detalles);
    if (values.fechaEvento) {
      formData.append('fechaEvento', values.fechaEvento.toISOString());
    }
    if (values.inspiracion) {
      formData.append('inspiracion', values.inspiracion);
    }

    try {
      // Aún no hemos creado esta API, pero lo haremos en el paso siguiente
      const response = await fetch('/api/pedidos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Algo salió mal. Intenta de nuevo.');
      }

      // ¡Éxito!
      setSuccess(true);
      form.reset();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Tu Nombre"
          placeholder="Ej: Laura"
          withAsterisk
          {...form.getInputProps('nombre')}
        />
        <TextInput
          label="Tu Email"
          placeholder="tu@email.com"
          withAsterisk
          mt="md"
          {...form.getInputProps('email')}
        />
        <DatePickerInput
          label="Fecha del Evento (opcional)"
          placeholder="Selecciona una fecha"
          mt="md"
          {...form.getInputProps('fechaEvento')}
        />
        <Textarea
          label="Cuéntanos tu idea"
          placeholder="Tipo de evento, colores, presupuesto, etc..."
          withAsterisk
          mt="md"
          minRows={4}
          {...form.getInputProps('detalles')}
        />
        <FileInput
          label="Foto de inspiración (opcional, máx 5MB)"
          placeholder="Sube un archivo .jpg o .png"
          mt="md"
          accept="image/png,image/jpeg"
          {...form.getInputProps('inspiracion')}
        />

        <Button type="submit" mt="xl" fullWidth>
          Enviar Pedido
        </Button>
      </form>

      {success && (
        <Alert title="¡Pedido Enviado!" color="green" mt="lg" onClose={() => setSuccess(false)} withCloseButton>
          ¡Gracias! Hemos recibido tu pedido y te contactaremos pronto.
        </Alert>
      )}

      {error && (
        <Alert title="Error" color="red" mt="lg" onClose={() => setError(null)} withCloseButton>
          {error}
        </Alert>
      )}
    </Box>
  );
}