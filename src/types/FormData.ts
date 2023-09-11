export type FormData = {
  email: string;
  fullName: string;
  streetAndNumber: string;
  postalCode: string;
  locality: string;
  cityOrTown: string;
  country: string;
  vat: number;
  tin: string;
  clientFullName: string;
  clientAddress: string;
  clientVat: number;
  clientTin: string;
  descriptionOfServices: string;
  services: {
    description: string;
    quantity: number;
    ratePerUnit: number;
    totalAmount: number;
  }[];
  paymentDueDate: string;
  paymentTerms: string;
  currency: string;
  bankAccountDetails: string;
  paymentInstructions: string;
  termsAndConditions: string;
  shippingFees: number;
};
