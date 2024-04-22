import createApiClient from "./api_service";

class PubService {
  constructor(baseUrl = "/api/pub") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/getAll")).data;
  }

  async create(data) {
    return (await this.api.post("/create", data)).data;
  }

  async editpub(id, data) {
    return (await this.api.put(`/update/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/delete-pub/${id}`)).data;
  }
  async getdetail(id) {
    return (await this.api.get(`/get-details/${id}`)).data;
  }
}
export default new PubService();
