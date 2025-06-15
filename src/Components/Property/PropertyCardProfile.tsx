import { TypeProperty } from '@/Types/TypeProperty';
import { OwnerCard } from '../Owners/OwnerCard';
import { PropertyCard } from './PropertyCard';
import propertyUtils from '@/Utils/PropertyUtils';

type Props = {
  propertyProfile: TypeProperty;
};

export const PropertyCardProfile = ({ propertyProfile }: Props) => {
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 bg-black text-white px-4 md:flex-row">
       <OwnerCard
         Owner={propertyProfile.owner}
         formatDate={propertyUtils.formatDate}
       />
        <PropertyCard
            propertyProfile={propertyProfile}
            formatPrice={propertyUtils.formatPrice}
        />
    </div>
  );
};
