export interface Type {
  _id: string;
  name: string;
  masterReference: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Syllabi {
  _id: string;
  knowledgeArea: string;
  specificKnowledge: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  domain: [{
      _id: string;
      name: string;
  }]
}

export interface GeneralMaster {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  type?: string;
}


