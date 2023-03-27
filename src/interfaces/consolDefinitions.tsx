import { Company, CompanyWithFixedContact } from "./customerDefinition";

export type Container = {
  containerNumber: string;
  sealNumber: string;
  containerType: string;

  counts: number;
  packType: string;

  tareWeight: number;
  netWeight: number;
  grossWeight: number;
  volumn: number;
  chargable: string;
};

export type OutturnResult = {
  packType: string;

  manifest: number;
  outturn: number;
  short: number;
  surplus: number;
  pillaged: number;
  damaged: number;

  weight: number;
  volumn: number;

  comments: string;
};

export type InvoiceRow = {
  hasGst: boolean;
  description: string;
  amount: number;
  gst: number;

  qty: number;
  unitPrice: number;
  unit: string;
};

export type Invoice = {
  invoiceType: string;
  invoiceNumber: string;
  relatedCompany: CompanyWithFixedContact;

  currency: string;
  AUDBaseRate: string;

  invoiceRows: [InvoiceRow];

  invoiceDate: number;
  invoiceBy: string;

  dueDate: number;

  paidDate: number;
  paidBy: string;
  matchingNumber: string;
  actuallyPaidAt: number;
  actuallyPayBy: string;
};

export type Shipment = {
  consignee: CompanyWithFixedContact;
  consignor: CompanyWithFixedContact;
  notifyParty: CompanyWithFixedContact;

  origin: string;
  destination: string;
  acceptance: string;

  shipmentId: string;
  HBL: string;
  EDN: string;
  orderReference: string;
  paymentType: string;
  blNum: string;

  onBoardDate: number;
  issueDate: number;

  releaseType: string;
  releaseAlert: boolean;

  description: string;
  goodsType: string;

  marks: string;

  outturnResult: OutturnResult;
  containers: [Container];

  incoterm: string;
  invoices: [Invoice];

  DOLocation: string;
  deliveryInstruction: string;
  deliveryType: string;
};

export type Route = {
  mode: string;
  vessel: string;
  voyage: string;
  IMO: string;

  load: string;
  discharge: string;

  ETA: number;
  ETD: number;
  ATA: number;
  ATD: number;
};

export type Consol = {
  consolId: string;
  operator: string;
  sales: string;
  status: string;
  transportMode: string;
  containerMode: string;
  MBL: string;
  EDN: string;

  carrier: CompanyWithFixedContact;
  coloader: CompanyWithFixedContact;
  paymentType: string;
  carrierBkgRef: string;

  dealDate: number;
  availableDate: number;
  storageDate: number;

  exportAgent: CompanyWithFixedContact;
  importAgent: CompanyWithFixedContact;
  warehouse: CompanyWithFixedContact;

  routings: [Route];
  cost: [Invoice];
  shipments: [Shipment];

  updatedAt: number;
  createdAt: number;
  submittedAt: number;
  reviewedAt: number;
  submitBy: string;
  reviewBy: string;
};

export type ConsolCard = {
  consolId: string;
  transportMode: string;
  containerMode: string;
  MBL: string;
  load: string;
  discharge: string;
  sendingAgentId: string;
  recievingAgentId: string;
  ETD: number;
  ETA: number;
  operator: string;
  sales: string;
  status: string;
};

export type ConsolSearchResult = {
  totalNum: number;
  page_no: number;
  page_num: number;
  consols: [ConsolCard];
};

export type InvoiceCard = {
  consolId: string;
  companyName: string;
  companyId: string;
  invoiceNumber: string;
  displayInvoiceNumber: string;
  ledger: string;
  HBL: string;
  invoiceDate: number;
  dueDate: number;
  currency: string;
  AUDBaseRate: string;
  amount: number;
  paidDate: string;
  matchingNumber: string;
};

export type InvoiceSearchResult = {
  totalNum: number;
  page_no: number;
  page_num: number;
  invoices: [InvoiceCard];
};

export type CurrencyNote = {
  currency: string;
  note: string;
};

export type ContainerInfo = {
  containerType: string;
  tareWeight: number;
};

export type ConsolFinancialCard = {
  consolId: string;
  sendingAgent: string;
  recievingAgent: string;
  createdAt: number;
  dealDate: number;
  submittedAt: number;
  reviewedAt: number;

  operator: string;
  sales: string;
  status: string;
  revenue: number;
  cost: number;
  revenueWithGst: number;
  costWithGst: number;
};

export type TransactionRecord = {
  type: string;
  id: string;
  amount: number;
  matchingNumber: string;
  paidDate: number;
  paidBy: string;
  invoiceType: string;
  currency: string;
  displayId: string;
};

export type ConsolFilters = {
  consolId?: string | null;
  consignorId?: string | null;
  operator?: string | null;
  shipmentId?: string | null;
  consigneeId?: string | null;
  sales?: string | null;
  vessel?: string | null;
  warehouseId?: string | null;
  containerId?: string | null;
  mbl?: string | null;

  load?: string | null;
  etd?: number | null;
  hbl?: string | null;
  discharge?: string | null;
  eta?: number | null;
  createdAtFrom?: number | null;
  createdAtTo?: number | null;
  dealDateFrom?: number | null;
  dealDateTo?: number | null;

  status?: string | null;
  paymentType?: string | null;
  onlyToday: boolean;
  importAgentId?: string | null;
  exportAgentId?: string | null;

  page_no: number;
  page_num: number;
};

export const EMPTY_CONSOL_FILTERS: ConsolFilters = {
  onlyToday: true,
  page_no: 1,
  page_num: 20,
};
