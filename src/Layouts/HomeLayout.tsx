import { CountUpGrid } from '@/Components/common/CountUpGrid';
import { Header } from '@/Components/common/Header';
import { Filters } from '@/Components/Property/Filters';
import ChromaGrid from '@/Components/Property/PropertyGrid';
import { useProperty } from '@/Hooks/useProperty';
import { useNavigate } from 'react-router-dom';

export const HomeLayout = () => {
    const { 
        watch, 
        setValue, 
        onSubmit, 
        clearFilters, 
        property, 
        isLoading 
      } = useProperty();
    
      const name = watch("Name");
      const address = watch("Address");
      const rangePrice = watch("rangePrice");
      const navigate = useNavigate();
    
      const handlePropertyClick = (property: any) => {
        console.log('Propiedad seleccionada:', property);
        navigate(`/property/${property.id}`);
        
      };
    
      return (
        <main className="text-white min-h-screen bg-black">
          <Header />
          
          <section className="py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <CountUpGrid />
            </div>
          </section>
    
          <section className="px-6 md:px-12 lg:px-20 pb-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
              <Filters
                name={name}
                address={address}
                priceRange={rangePrice}
                onNameChange={(val) => setValue("Name", val)}
                onAddressChange={(val) => setValue("Address", val)}
                onPriceChange={(val) => setValue("rangePrice", val)}
                onSearch={() => onSubmit()}
                onClear={clearFilters}
                minPrice={0}
                maxPrice={10000000000} 
                isLoading={isLoading}
              />
    
              {/* Grid de Propiedades */}
              <div className="h-[80vh] relative">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-zinc-400">Loading ...</p>
                    </div>
                  </div>
                ) : property.length > 0 ? (
                  <ChromaGrid
                    properties={property}
                    columns={3}
                    className="h-full"
                    onPropertyClick={handlePropertyClick}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-zinc-400 text-lg mb-2">Property not found</p>
                      <p className="text-zinc-500 text-sm">Try adjusting your search filters</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      );
}