class PropertyUtils {
    public formatPrice = (price: number) =>
        new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(price);

    
    public formatDate = (birthday: string) =>
        new Intl.DateTimeFormat('es-CO', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(new Date(birthday));
}

const propertyUtils = new PropertyUtils();
export default propertyUtils;