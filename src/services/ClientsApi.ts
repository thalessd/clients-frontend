import type {ClientFormData} from "@/types/ClientFormData";
import type {Client} from "@/types/Client";
import {API_URL} from "@/constants/api";
import axios from "axios";

export class ClientsApi {
  static async create(formData: ClientFormData): Promise<Client> {
    const response = await axios.post<Client>(`${API_URL}/clients`, formData)
    return response.data
  }
}