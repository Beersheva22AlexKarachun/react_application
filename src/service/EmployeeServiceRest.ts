import { Observable, Subscriber } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeeService";
import { CompatClient, Stomp } from "@stomp/stompjs"
import WebSocketMessage from "../model/WebSocketMessage";

const TOPIC: string = "/topic/employees";

async function getResponseText(response: Response): Promise<string> {
  let res = '';
  if (!response.ok) {
    const { status } = response;
    res = status == 401 || status == 403 ? 'Authentication' : await response.text();
  }
  return res;
}

function getHeaders(): HeadersInit {
  const res: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
  }
  return res;
}

async function fetchRequest(url: string, options: RequestInit, empl?: Employee): Promise<Response> {
  options.headers = getHeaders();
  if (empl) {
    options.body = JSON.stringify(empl);
  }
  let flUpdate = true;
  let responseText = '';
  try {
    if (options.method == "DELETE" || options.method == "PUT") {
      flUpdate = false;
      await fetchRequest(url, { method: "GET" });
      flUpdate = true;
    }

    const response = await fetch(url, options);
    responseText = await getResponseText(response);
    if (responseText) {
      throw responseText;
    }
    return response;
  } catch (error: any) {
    if (!flUpdate) {
      throw error;
    }
    throw responseText ? responseText : "Server is unavailable. Repeat later on";
  }
}

async function fetchAllEmployees(url: string): Promise<Employee[] | string> {
  const response = await fetchRequest(url, {});
  return await response.json()
}
export default class EmployeesServiceRest implements EmployeesService {
  private cache: Map<number, Employee> = new Map<number, Employee>;
  private observable: Observable<Employee[] | string> | null = null;
  private subscriber: Subscriber<string | Employee[]> | undefined;
  private urlService: string;
  private urlWebSocket: string;
  private stompClient: CompatClient;

  constructor(baseUrl: string) {
    this.urlService = `http://${baseUrl}/employees`;
    this.urlWebSocket = `ws://${baseUrl}/websocket/employees`;
    this.stompClient = Stomp.client(this.urlWebSocket)
  }

  async updateEmployee(empl: Employee): Promise<Employee> {
    const response = await fetchRequest(this.getUrlWithId(empl.id!),
      { method: 'PUT' }, empl);
    return await response.json();
  }

  private getUrlWithId(id: any): string {
    return `${this.urlService}/${id}`;
  }

  private sibscriberNext(): void {
    const employees: Employee[] = Array.from(this.cache.values());
    this.subscriber?.next(employees)
  }

  async deleteEmployee(id: any): Promise<void> {
    fetchRequest(this.getUrlWithId(id), {
      method: 'DELETE',
    });
  }

  getEmployees(): Observable<Employee[] | string> {
    if (!this.observable) {
      this.observable = new Observable<Employee[] | string>(subscriber => {
        this.subscriber = subscriber;
        fetchAllEmployees(this.urlService)
          .then(employees => {
            if (typeof employees == "object") {
              employees.forEach(empl => this.cache.set(empl.id, empl))
              this.sibscriberNext();
            } else {
              this.subscriber?.next(employees)
            }
          })
          .catch(error => this.subscriber?.next(error));

        this.connectWebSocket();
        return () => this.disconnectWebSocket();
      })
    }
    return this.observable;
  }

  private connectWebSocket() {
    this.stompClient.connect({},
      () => this.stompClient.subscribe(TOPIC, message => {
        const webMessage: WebSocketMessage = JSON.parse(message.body);
        const operation = webMessage.operation.toLowerCase();
        
        if (operation == "added" || operation == "updated") {
          const empl: Employee = JSON.parse(webMessage.payload);
          this.cache.set(empl.id, empl)

        } else if (operation == "deleted") {
          const id: number = JSON.parse(webMessage.payload);
          this.cache.delete(id)
        }
        this.sibscriberNext();
      }),
      (error: any) => this.subscriber?.next(JSON.stringify(error)),
      () => console.log("Websocket disconnected"));
  }

  private disconnectWebSocket() {
    this.stompClient.disconnect();
  }

  async addEmployee(empl: Employee): Promise<Employee> {
    const response = await fetchRequest(this.urlService, {
      method: 'POST',
    }, empl);
    return response.json();
  }
}