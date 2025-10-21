import { Container, Title } from '@mantine/core';
import { FormularioPedido } from '@/components/FormularioPedido'; // <-- DESCOMENTA ESTO

export default function HomePage() {
  return (
    <Container size="sm" py="xl">
      <Title order={1} ta="center" mb="lg">
        Haz tu Pedido
      </Title>
      <FormularioPedido /> {/* <-- DESCOMENTA ESTO y borra el <p> */}
    </Container>
  );
}