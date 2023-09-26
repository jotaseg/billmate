import { useState, ChangeEvent, FormEvent } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { FormData } from "../types/FormData";
import { FormField } from "./FormField";
import { FormTextarea } from "./FormTextarea";
import { FormSelect } from "./FormSelect";
import { Button } from "./Button";
import { drawText } from "../utils/drawText";

export const App = () => {
  const [formData, setFormData] = useState<FormData>({
    invoiceNumber: "",
    invoiceDate: "",
    fullName: "",
    streetAndNumber: "",
    postalCode: "",
    locality: "",
    cityOrTown: "",
    country: "",
    vat: 0,
    tin: "",
    clientFullName: "",
    clientAddress: "",
    clientPostalCode: "",
    clientLocality: "",
    clientCityOrTown: "",
    clientCountry: "",
    clientTin: "",
    descriptionOfServices: "",
    services: [],
    paymentDueDate: "",
    paymentTerms: "",
    currency: "",
    bankAccountDetails: "",
    paymentInstructions: "",
    termsAndConditions: "",
    shippingFees: 0,
  });

  const [pdfEmbed, setPdfEmbed] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name) {
      if (name.startsWith("services[")) {
        const matchResult = name.match(/(\d+)\.(.+)/);
        if (matchResult) {
          const [serviceIndexStr, fieldName] = matchResult.slice(1);
          const serviceIndex = parseInt(serviceIndexStr, 10);
          if (!isNaN(serviceIndex)) {
            const updatedServices = [...formData.services] as {
              description: string;
              quantity: number;
              ratePerUnit: number;
              totalAmount: number;
            }[];
            (updatedServices[serviceIndex] as any)[fieldName] =
              fieldName === "quantity" || fieldName === "ratePerUnit"
                ? parseFloat(value)
                : value;
            updatedServices[serviceIndex].totalAmount =
              updatedServices[serviceIndex].quantity *
              updatedServices[serviceIndex].ratePerUnit;
            setFormData({ ...formData, services: updatedServices });
          }
        }
      } else {
        if (name === "invoiceNumber" || name === "invoiceDate") {
          setFormData({ ...formData, [name]: value });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([400, 400]);
    const { height } = page.getSize();

    const helveticaFont = await pdfDoc.embedFont("Helvetica");

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedVat = `${formData.vat.toFixed(2)}%`;

    drawText(
      page,
      `Invoice Number: ${formData.invoiceNumber}`,
      50,
      height - 20,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Invoice Date: ${currentDate}`,
      50,
      height - 40,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Full Name or Business Name: ${formData.fullName}`,
      50,
      height - 60,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Address: ${formData.streetAndNumber}`,
      50,
      height - 80,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Locality: ${formData.locality}`,
      50,
      height - 100,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `City / Town: ${formData.cityOrTown}`,
      50,
      height - 120,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Country: ${formData.country}`,
      50,
      height - 140,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Tax Identification Number (TIN): ${formData.tin}`,
      50,
      height - 160,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Client's Full Name or Business Name: ${formData.clientFullName}`,
      50,
      height - 180,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Client's Address: ${formData.clientAddress}`,
      50,
      height - 200,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Client's Postal Code: ${formData.clientPostalCode}`,
      50,
      height - 220,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Client's Locality: ${formData.clientLocality}`,
      50,
      height - 240,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Client's City / Town: ${formData.clientCityOrTown}`,
      50,
      height - 260,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Client's Country: ${formData.clientCountry}`,
      50,
      height - 280,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Client's Tax Identification Number (TIN): ${formData.clientTin}`,
      50,
      height - 300,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Currency: ${formData.currency}`,
      50,
      height - 320,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Payment Due Date: ${formData.paymentDueDate}`,
      50,
      height - 340,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );

    formData.services.forEach((service, index) => {
      const startY = height - 360 - index * 60;
      drawText(
        page,
        `Service ${index + 1}: ${service.description}`,
        50,
        startY,
        14,
        helveticaFont,
        rgb(0, 0, 0)
      );
      drawText(
        page,
        `Quantity: ${service.quantity}`,
        200,
        startY,
        14,
        helveticaFont,
        rgb(0, 0, 0)
      );
      drawText(
        page,
        `Rate Per Unit: $${service.ratePerUnit.toFixed(2)}`,
        300,
        startY,
        14,
        helveticaFont,
        rgb(0, 0, 0)
      );
      drawText(
        page,
        `Total Amount: $${service.totalAmount.toFixed(2)}`,
        400,
        startY,
        14,
        helveticaFont,
        rgb(0, 0, 0)
      );
    });

    drawText(
      page,
      `Payment Terms: ${formData.paymentTerms}`,
      50,
      height - 360 - formData.services.length * 60,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Bank Account Details: ${formData.bankAccountDetails}`,
      50,
      height - 380 - formData.services.length * 60,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Payment Instructions: ${formData.paymentInstructions}`,
      50,
      height - 400 - formData.services.length * 60,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Terms and Conditions: ${formData.termsAndConditions}`,
      50,
      height - 420 - formData.services.length * 60,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `VAT: ${formattedVat}`,
      50,
      height - 440 - formData.services.length * 60,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );
    drawText(
      page,
      `Shipping Fees: $${formData.shippingFees.toFixed(2)}`,
      50,
      height - 460 - formData.services.length * 60,
      14,
      helveticaFont,
      rgb(0, 0, 0)
    );

    const generatedPdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

    setPdfDataUri(generatedPdfDataUri);

    setPdfEmbed(true);

    setFormData({
      invoiceNumber: "",
      invoiceDate: "",
      fullName: "",
      streetAndNumber: "",
      postalCode: "",
      locality: "",
      cityOrTown: "",
      country: "",
      vat: 0,
      tin: "",
      clientFullName: "",
      clientAddress: "",
      clientPostalCode: "",
      clientLocality: "",
      clientCityOrTown: "",
      clientCountry: "",
      clientTin: "",
      descriptionOfServices: "",
      services: [],
      paymentDueDate: "",
      paymentTerms: "",
      currency: "",
      bankAccountDetails: "",
      paymentInstructions: "",
      termsAndConditions: "",
      shippingFees: 0,
    });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        {
          description: "",
          quantity: 1,
          ratePerUnit: 0,
          totalAmount: 0,
        },
      ],
    });
  };

  const removeService = (index: number) => {
    const updatedServices = [...formData.services];
    updatedServices.splice(index, 1);
    setFormData({ ...formData, services: updatedServices });
  };

  return (
    <main className="bg-gray-900 p-8 grid place-content-center">
      <h1 className="text-3xl text-white mb-4">Invoice Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="text-gray-100 mb-3">Invoice Information</legend>
          <FormField
            label="Invoice Number"
            name="invoiceNumber"
            type="text"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
            required
            example="E.g., INV12345"
          />
          <FormField
            label="Invoice Date"
            name="invoiceDate"
            type="date"
            value={formData.invoiceDate}
            onChange={handleInputChange}
            required
            example="E.g. 10/06/2009"
          />
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-4">
          <legend className="text-gray-100 mb-3">Sender Information</legend>
          <FormField
            label="Full Name / Business Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            example="E.g. John Doe's Company"
          />
          <FormField
            label="Address (street and number)"
            name="streetAndNumber"
            type="text"
            value={formData.streetAndNumber}
            onChange={handleInputChange}
            required
            example="E.g. 123 International Avenue"
          />
          <FormField
            label="Postal Code"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
            example="E.g. 56789"
          />
          <FormField
            label="Locality"
            name="locality"
            type="text"
            value={formData.locality}
            onChange={handleInputChange}
            example="E.g. Business Center"
          />
          <FormField
            label="City / Town"
            name="cityOrTown"
            type="text"
            value={formData.cityOrTown}
            onChange={handleInputChange}
            required
            example="E.g. Metropolis"
          />
          <FormField
            label="Country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleInputChange}
            required
            example="E.g. United Kingdom"
          />
          <FormField
            label="Tax Identification Number (TIN)"
            name="tin"
            type="text"
            value={formData.tin}
            onChange={handleInputChange}
            example="E.g. GB123456789"
          />
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-4">
          <legend className="text-gray-100 mb-3">Client Information</legend>
          <FormField
            label="Client's Full Name / Business Name"
            name="clientFullName"
            type="text"
            value={formData.clientFullName}
            onChange={handleInputChange}
            required
            example="E.g. EuroTech Solutions GmbH"
          />
          <FormField
            label="Client's Address"
            name="clientAddress"
            type="text"
            value={formData.clientAddress}
            onChange={handleInputChange}
            required
            example="E.g. 456 Tech Street"
          />
          <FormField
            label="Client's Postal Code"
            name="clientPostalCode"
            type="text"
            value={formData.clientPostalCode}
            onChange={handleInputChange}
            example="E.g. 12345"
          />
          <FormField
            label="Client's Locality"
            name="clientLocality"
            type="text"
            value={formData.clientLocality}
            onChange={handleInputChange}
            example="E.g. Techville"
          />
          <FormField
            label="Client's City / Town"
            name="clientCityOrTown"
            type="text"
            value={formData.clientCityOrTown}
            onChange={handleInputChange}
            required
            example="E.g. Berlin"
          />
          <FormField
            label="Client's Country"
            name="clientCountry"
            type="text"
            value={formData.clientCountry}
            onChange={handleInputChange}
            required
            example="E.g. Germany"
          />
          <FormField
            label="Client's Tax Identification Number (TIN)"
            name="clientTin"
            type="text"
            value={formData.clientTin}
            onChange={handleInputChange}
            example="E.g. DE987654321"
          />
        </fieldset>
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="text-gray-100 mb-3">Payment Information</legend>
          <FormSelect
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData({ ...formData, [name]: value });
            }}
            required
          />
          <FormField
            label="Payment Due Date"
            name="paymentDueDate"
            type="date"
            value={formData.paymentDueDate}
            onChange={handleInputChange}
            required
            example="E.g. 11/08/2009"
          />
        </fieldset>
        <fieldset className="grid grid-cols-1 gap-4">
          <legend className="text-gray-100 mb-3">Services</legend>
          <div className="w-full mx-auto">
            {formData.services.map((service, index) => (
              <div key={index}>
                <div className="grid grid-cols-4 gap-4">
                  <FormField
                    label={`Service ${index + 1}`}
                    name={`services[${index}].description`}
                    type="text"
                    value={service.description}
                    onChange={handleInputChange}
                    required
                    example="E.g. IT Consulting Services"
                  />
                  <FormField
                    label={`Quantity`}
                    name={`services[${index}].quantity`}
                    type="number"
                    value={service.quantity}
                    onChange={handleInputChange}
                    required
                    example="E.g. 20 hours"
                  />
                  <FormField
                    label={`Rate Per Unit`}
                    name={`services[${index}].ratePerUnit`}
                    type="number"
                    value={service.ratePerUnit}
                    onChange={handleInputChange}
                    required
                    example="E.g. €75 per hour"
                  />
                  <Button
                    type="button"
                    onClick={() => removeService(index)}
                    label="X"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-300 mt-1">
                    Total Amount: {service.totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" onClick={addService} label="Add Service" />
        </fieldset>
        <fieldset className="grid grid-cols-3 gap-4">
          <legend className="text-gray-100 mb-3">
            Payment and Banking Details
          </legend>
          <FormTextarea
            label="Payment Terms"
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleInputChange}
            rows={4}
            example="E.g. Net 15 days (Payment is due within 15 days from the invoice date)"
          />
          <FormTextarea
            label="Bank Account Details"
            name="bankAccountDetails"
            value={formData.bankAccountDetails}
            onChange={handleInputChange}
            rows={4}
            placeholder={`Bank Name: Global Bank\nAccount Holder: Global Trade Ltd\nIBAN: GB12 XXXX XXXX XXXX XXXX XX\nBIC/SWIFT Code: GLOBBNK1234`}
            example="E.g. Details of the bank"
          />
          <FormTextarea
            label="Payment Instructions"
            name="paymentInstructions"
            value={formData.paymentInstructions}
            onChange={handleInputChange}
            rows={4}
            placeholder="Additional Payment Instructions or Terms"
            example="E.g. Please include the invoice number as the payment reference."
          />
        </fieldset>
        <fieldset className="grid grid-cols-2 gap-4">
          <legend className="text-gray-100 mb-3">Additional Information</legend>
          <FormTextarea
            label="Terms and Conditions"
            name="termsAndConditions"
            value={formData.termsAndConditions}
            onChange={handleInputChange}
            rows={4}
            placeholder="Terms and Conditions (e.g., late payment fees, refund policies, confidentiality agreements)"
            example="Payment is due within 15 days of the invoice date. "
          />
          <div>
            <FormField
              label="VAT (Value Added Tax)"
              name="vat"
              type="number"
              value={formData.vat}
              onChange={handleInputChange}
              example="E.g. 9%"
            />
            <FormField
              label="Shipping Fees"
              name="shippingFees"
              type="number"
              value={formData.shippingFees}
              onChange={handleInputChange}
              example="E.g. €50"
            />
          </div>
        </fieldset>
        <Button type="submit" label="Generate Invoice" />
      </form>
      {pdfEmbed && (
        <div className="mt-8">
          <iframe
            title="Generated Invoice"
            width="100%"
            height="600"
            src={pdfDataUri || undefined}
          />
        </div>
      )}
    </main>
  );
};
