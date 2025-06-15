import { filterType, responseProperty, TypeProperty } from "@/Types/TypeProperty";
import RestService from "./RestService";

class PropertyService extends RestService {
    constructor() {
        super('https://millionsback.azurewebsites.net/api/Property');
    }


    public async getPropertyByFilter(
        filters: filterType
    ) : Promise<responseProperty> {
        try {
            const response : TypeProperty[] = await this.post('/Filter' , filters);
            return {
                data: response,
                ok: true,
                message: 'Success'
            };
        } catch (error) {
            return{
                data: null,
                ok: false,
                message: 'Error'
            }
        }
    }

    public async getPropertyProfile (id: string) : Promise<TypeProperty> {
        try{
            const response : TypeProperty = await this.get('/' + id);
            return response;
        }catch(error){
            return {} as TypeProperty;
        }
    }

}

const propertyService = new PropertyService();
export default propertyService;