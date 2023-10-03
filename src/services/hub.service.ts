import http from "../http.common";
import IHubData from "../types/hubs.type";

class HubDataService {
  getAll() {
    return http.get<Array<IHubData>>("/");
  }
  get(id: string) {
    return http.get<IHubData>(`/${id}`);
  }
  create(data: IHubData) {
    return http.post<IHubData>("/", data);
  }
  update(data: IHubData, id: any) {
    return http.put<any>(`/${id}`, data);
  }
  delete(id: any) {
    return http.delete<any>(`/${id}`);
  }
  deleteAll() {
    return http.delete<any>("/");
  }
  findByTitle(title: string) {
    return http.get<Array<IHubData>>(`/?title=${title}`);
  }
}

const HubsDataService = new HubDataService();
export default HubsDataService;
