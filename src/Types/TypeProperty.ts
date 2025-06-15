export interface TypeProperty {
    id: string;
    idOwner: string;
    name: string;
    address: string;
    price : number
    image:imagePorperty
    owner : owner
}

export interface filterType {
    Name : string;
    Address : string;
    rangePrice?: [number , number] | undefined;
    MinPrice?: number | null;
    MaxPrice?: number | null;
    
}

export interface responseProperty {
    data: TypeProperty[] | TypeProperty | null;
    ok: boolean;
    message: string;
}

interface imagePorperty {
    id: string;
    idProperty: string;
    fileLink: string;
}

export interface owner{
    id: string;
    name: string;
    address: string;
    photo: string;
    birthday: string;
}
