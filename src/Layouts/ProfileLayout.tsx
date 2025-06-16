import { PropertyCardProfile } from '@/Components/Property/PropertyCardProfile';
import { usePropertyProfile } from '@/Hooks/usePropertyProfile';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';



export const ProfileLayout = () => {
    const params = useParams();
    const { id } = params;
    const { getProfileProperty, propertyProfile, isLoading } = usePropertyProfile();
  
  
    useEffect(() => {
      if (id) {
        getProfileProperty(id);
      }
    }, [id]); 
  
  
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading ...</p>
          </div>
        </div>
      );
    }
  
    if (!propertyProfile) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-zinc-400 text-lg">Property not found</p>
          </div>
        </div>
      );
    }
  
    return (
      <div>
        <PropertyCardProfile propertyProfile={propertyProfile} />
      </div>
    );
}