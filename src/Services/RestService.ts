abstract class RestService {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get(url: string, params?: any) {
        const response = await fetch(this.baseUrl + url, {
            method: 'GET',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return await response.json();
    }

    public async post(url: string, data: any) {
        const response = await fetch(this.baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        return await response.json();
    }
}

export default RestService;