import { SolicitationAudit } from "@/commons/type";

export interface TechnicalReport {
    id?: number;
    description: string;
    date: Date;
    solicitation: any,
    price:number;
    amountHours:number
    amountSamples:number
    multiPartFileLists?:any
}