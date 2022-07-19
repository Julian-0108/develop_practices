export interface IKnowledgePlatform {
    domains: string;
    tecnology: string;
    version: string;
}

export interface IKnowledgeTools {
    domains: string;
    tecnology: string;
    tool_option: string;
    version: string;
    levelKnowledge: number | string;
    exp: number | string;
}

export interface IKnowledgeKnowledgesSpecify {
    domains: string;
    tecnology: string;
    version: string;
}


export interface IKnowledge {
    platforms: IKnowledgePlatform[];
    tools: IKnowledgeTools[];
    knowledgesSpecify: any[] | IKnowledgeKnowledgesSpecify[];
}

export interface ICheckAvailability {
    _id: string;
    name: string;
    identifation: number;
    name_team: string;
    cargo: string;
    _id_leader: string;
    leader_name: string;
    date_start: string;
    date_end: string;
    hoursD: number;
    total_hoursD: number;
    id_status: boolean | number;
    status_name: string;
    knowledge: IKnowledge;
}

export interface ILeaderList {
    _id: string;
    name: string;
    active: boolean;
}

// Interface correspondiente al filtro "principal" correspondiendo a los input "Lideres", "Fecha Inicio" y "Fecha Final"
export interface IMainFilter {
    leader: string[] | null;
    dateStart: Date | null;
    dateEnd: Date | null;
}

// Interface correspondiente al filtro "principal" correspondiendo al input "Buscar Conocimientos"
export interface IKnowledgeFilter {
    value: string;
}

// Recopilacion de todas las Interfaces
export interface IFliterCheckAvailability {
    mainFilter: IMainFilter;
    knowledgeFilter: IKnowledgeFilter | null;
}