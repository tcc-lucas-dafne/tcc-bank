export function formatCurrency(value?: string | number | null) {
  if (!value) return "R$ 0,00";
  if (typeof value === "number") {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  const parsedValue = parseFloat(value);
  if (parsedValue || !isNaN(parsedValue)) {
    return parsedValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  };

  return "R$ 0,00"
}