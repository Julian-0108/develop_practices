export interface Leader {
    _id_leader: number;
    leader_name: string;
}
export interface State {
    id_status: boolean | number;
    status_name: string;
}
export interface integrante {
    _id: string;
    name: string;
    identifation: number;
    name_team: string;
    cargo: string;
    leader: Leader;
}
export interface integranteAssign {
    _id: string;
    name: string;
    identifation: number;
    name_team: string;
    cargo: string;
    leader: Leader;
    date_start: string;
    date_end: string;
    hoursD: number;
    total_hoursD: number;
    status: State;
}

export interface getDataAlertAssign {
    integrante: integrante | integranteAssign;
    update: boolean;
}