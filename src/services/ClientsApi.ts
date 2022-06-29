import type {ClientFormData} from "@/types/ClientFormData";
import type {Client} from "@/types/Client";
import {API_URL} from "@/constants/api";
import axios from "axios";

export class ClientsApi {
  private static readonly URL: string = `${API_URL}/clients`

  static async create(formData: ClientFormData): Promise<Client> {
    const response = await axios.post<Client>(this.URL, formData)
    return response.data
  }

  static async findAll(): Promise<Client[]> {
    const response = await axios.get<Client[]>(this.URL)
    return response.data
  }

  static async update(id: string, formData: ClientFormData): Promise<Client> {
    const response = await axios.patch<Client>(`${this.URL}/${id}`, formData)
    return response.data
  }

  static async delete(id: string): Promise<void> {
    await axios.delete(`${this.URL}/${id}`)
  }
}