export type CompanyContact = {
  phone: string;
  fax: string;
  email: string;

  line1?: string | null;
  line2?: string | null;
  line3?: string | null;
  line4?: string | null;
  line5?: string | null;

  addressLine1: string;
  addressLine2: string;
  country: string;
  city: string;
  postcode: string;
  state: string;
};

export type Company = {
  name: string;
  manager: string;
  id: string;
  type: string;
  unloco: string;

  note: string;
  chargeStandard: string;
  businessNo: string;
  deliveryInstruction: string;
  tradingHours: string;

  contacts: [CompanyContact];
};

export type CompanyWithFixedContact = {
  name: string;
  manager: string;
  id: string;
  type: string;
  unloco: string;

  note: string;
  chargeStandard: string;
  businessNo: string;
  deliveryInstruction: string;
  tradingHours: string;

  phone: string;
  fax: string;
  email: string;

  line1?: string | null;
  line2?: string | null;
  line3?: string | null;
  line4?: string | null;
  line5?: string | null;
};

export type Vessel = {
  name: string;
  IMO: string;
};
