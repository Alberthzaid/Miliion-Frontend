import { filterType, TypeProperty } from "@/Types/TypeProperty"
import { useEffect, useState, useCallback } from "react"
import propertyService from "@/Services/PropertyService";
import { useForm } from "react-hook-form";

export const useProperty = () => {
  const [property, setProperty] = useState<TypeProperty[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<filterType>({
    defaultValues: {
      Name: '',
      Address: '',
      rangePrice: [0, 10000],
      MinPrice: 0,
      MaxPrice: 10000,
    },
  });

  const fetchFilteredProperties = useCallback(async (filters?: Partial<filterType>) => {
    setIsLoading(true);
    try {
      let currentFilters: any;
      if (filters) {
        currentFilters = filters;
      } else {
        currentFilters = {
          Name: watch('Name') || '',
          Address: watch('Address') || '',
          MinPrice: watch('rangePrice')?.[0] || 0,
          MaxPrice: watch('rangePrice')?.[1] || 10000000000,
        };
      }
      const result = await propertyService.getPropertyByFilter(currentFilters);
      
      if (result.ok && Array.isArray(result.data)) {
        setProperty(result.data);
      } else {
        setProperty([]);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperty([]);
    } finally {
      setIsLoading(false);
    }
  }, [watch]);

  const onSubmit = handleSubmit((data: any) => {
    fetchFilteredProperties({
      Name: data.Name || null,
      Address: data.Address || null,
      MinPrice: data?.rangePrice[0] || null,
      MaxPrice: data?.rangePrice[1] || null,
    });
  });

  const clearFilters = () => {
    reset({
      Name: '',
      Address: '',
      rangePrice: [0, 10000],
      MinPrice: null,
      MaxPrice: null,
    });
    

    fetchFilteredProperties({
      Name: '',
      Address: '',
      MinPrice: null,
      MaxPrice: null,
    });
  };


  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        const timeoutId = setTimeout(() => {
          fetchFilteredProperties();
        }, 500);
        return () => clearTimeout(timeoutId);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, fetchFilteredProperties]);

  
  useEffect(() => {
    fetchFilteredProperties({
      Name: '',
      Address: '',
      MinPrice: 0,
      MaxPrice: 10000000000,
    });
  }, []);

  return {
    register,
    watch,
    setValue,
    onSubmit,
    reset,
    clearFilters,
    property,
    isLoading,
    errors,
  };
};