import propertyService from "@/Services/PropertyService";
import { useState } from "react";

export const usePropertyProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [propertyProfile, setPropertyProfile] = useState<any | null>(null);


    const getProfileProperty = async (id: any) => {
        setIsLoading(true);
        try {
          const result = await propertyService.getPropertyProfile(id);
          setPropertyProfile(result);
        } catch (error) {
          console.error('Error fetching properties:', error);
          setPropertyProfile([]);
        } finally {
          setIsLoading(false);
        }
    };

    return {
        getProfileProperty,
        propertyProfile,
        isLoading
    }
}