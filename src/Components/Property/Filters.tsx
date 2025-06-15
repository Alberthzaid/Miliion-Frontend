import { Label } from "@radix-ui/react-label"
import { Input } from "@/Components/common/input"
import { Button } from "../common/ButtonSearch"
import { useState, useEffect } from "react";

type FiltersProps = {
  name?: string;
  address?: string;
  priceRange: any;
  onNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onPriceChange: (value: [number, number]) => void;
  onSearch: () => void;
  onClear: () => void;
  minPrice: number;
  maxPrice: number;
  isLoading?: boolean;
};

export function Filters({
  name = '',
  address = '',
  priceRange,
  onNameChange,
  onAddressChange,
  onPriceChange,
  onSearch,
  onClear,
  minPrice,
  maxPrice,
  isLoading = false
}: FiltersProps) {
  const [localName, setLocalName] = useState(name);
  const [localAddress, setLocalAddress] = useState(address);

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalName(value);
    onNameChange(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalAddress(value);
    onAddressChange(value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onPriceChange([value, Math.max(value, priceRange[1])]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    onPriceChange([Math.min(priceRange[0], value), value]);
  };

  return (
    <div className="w-full max-w-xs h-[80vh] overflow-y-auto p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
      {/* Filtro por Nombre */}
      <div>
        <Label htmlFor="name" className="text-zinc-300 text-sm font-medium mb-2 block">
          Nombre de la propiedad
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Buscar por nombre..."
          value={localName}
          onChange={handleNameChange}
          className="bg-zinc-800 border-zinc-700 focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-500"
        />
      </div>

      {/* Filtro por Dirección */}
      <div>
        <Label htmlFor="address" className="text-zinc-300 text-sm font-medium mb-2 block">
          Dirección
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="Buscar por dirección..."
          value={localAddress}
          onChange={handleAddressChange}
          className="bg-zinc-800 border-zinc-700 focus:ring-2 focus:ring-blue-500 text-white placeholder:text-zinc-500"
        />
      </div>

      {/* Filtro por Rango de Precio */}
      <div>
        <Label className="text-zinc-300 text-sm font-medium mb-3 block">
          Rango de Precio
        </Label>
        
        {/* Precio Mínimo */}
        <div className="mb-3">
          <Label className="text-zinc-400 text-xs mb-1 block">Precio Mínimo</Label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Precio Máximo */}
        <div className="mb-3">
          <Label className="text-zinc-400 text-xs mb-1 block">Precio Máximo</Label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Valores del rango */}
        <div className="flex justify-between text-xs text-zinc-400 mt-2">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
        
        {/* Rango visual */}
        <div className="text-center text-sm text-zinc-300 mt-2 p-2 bg-zinc-800 rounded-lg">
          {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col gap-3 pt-4">
        <Button 
          onClick={onSearch}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Buscando...' : 'Buscar Propiedades'}
        </Button>
        <Button 
          variant="secondary" 
          onClick={onClear}
          disabled={isLoading}
          className="w-full bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50"
        >
          Limpiar Filtros
        </Button>
      </div>

      {/* Indicador de carga */}
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
