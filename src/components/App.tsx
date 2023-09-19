import { useState, ChangeEvent, FormEvent } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { FormData } from "../types/FormData";
import { FormField } from "./FormField";
import { FormTextarea } from "./FormTextarea";
import { FormSelect } from "./FormSelect";
import { Button } from "./Button";

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

    page.drawText(`Invoice Number: ${formData.invoiceNumber}`, {
      x: 50,
      y: height - 20,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Invoice Date: ${currentDate}`, {
      x: 50,
      y: height - 40,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Full Name or Business Name: ${formData.fullName}`, {
      x: 50,
      y: height - 60,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Address: ${formData.streetAndNumber}`, {
      x: 50,
      y: height - 80,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Locality: ${formData.locality}`, {
      x: 50,
      y: height - 100,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`City / Town: ${formData.cityOrTown}`, {
      x: 50,
      y: height - 120,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Country: ${formData.country}`, {
      x: 50,
      y: height - 140,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Tax Identification Number (TIN): ${formData.tin}`, {
      x: 50,
      y: height - 160,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(
      `Client's Full Name or Business Name: ${formData.clientFullName}`,
      {
        x: 50,
        y: height - 180,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      }
    );

    page.drawText(`Client's Address: ${formData.clientAddress}`, {
      x: 50,
      y: height - 200,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Client's Postal Code: ${formData.clientPostalCode}`, {
      x: 50,
      y: height - 220,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Client's Locality: ${formData.clientLocality}`, {
      x: 50,
      y: height - 240,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Client's City / Town: ${formData.clientCityOrTown}`, {
      x: 50,
      y: height - 260,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Client's Country: ${formData.clientCountry}`, {
      x: 50,
      y: height - 280,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(
      `Client's Tax Identification Number (TIN): ${formData.clientTin}`,
      {
        x: 50,
        y: height - 300,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      }
    );

    page.drawText(`Currency: ${formData.currency}`, {
      x: 50,
      y: height - 320,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Payment Due Date: ${formData.paymentDueDate}`, {
      x: 50,
      y: height - 340,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    formData.services.forEach((service, index) => {
      const startY = height - 360 - index * 60;
      page.drawText(`Service ${index + 1}: ${service.description}`, {
        x: 50,
        y: startY,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Quantity: ${service.quantity}`, {
        x: 200,
        y: startY,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Rate Per Unit: $${service.ratePerUnit.toFixed(2)}`, {
        x: 300,
        y: startY,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Total Amount: $${service.totalAmount.toFixed(2)}`, {
        x: 400,
        y: startY,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });

    page.drawText(`Payment Terms: ${formData.paymentTerms}`, {
      x: 50,
      y: height - 360 - formData.services.length * 60,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Bank Account Details: ${formData.bankAccountDetails}`, {
      x: 50,
      y: height - 380 - formData.services.length * 60,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Payment Instructions: ${formData.paymentInstructions}`, {
      x: 50,
      y: height - 400 - formData.services.length * 60,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Terms and Conditions: ${formData.termsAndConditions}`, {
      x: 50,
      y: height - 420 - formData.services.length * 60,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`VAT: ${formattedVat}`, {
      x: 50,
      y: height - 440 - formData.services.length * 60,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Shipping Fees: $${formData.shippingFees.toFixed(2)}`, {
      x: 50,
      y: height - 460 - formData.services.length * 60,
      size: 14,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

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
    <main className="bg-gray-900 p-4 grid place-content-center">
      <h1 className="text-3xl text-white mb-4">Invoice Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <section className="grid grid-cols-2 gap-4">
          <FormField
            label="Invoice Number"
            name="invoiceNumber"
            type="text"
            value={formData.invoiceNumber}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Invoice Date"
            name="invoiceDate"
            type="date"
            value={formData.invoiceDate}
            onChange={handleInputChange}
            required
          />
        </section>
        <section className="grid grid-cols-3 gap-4">
          <FormField
            label="Full Name / Business Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Address (street and number)"
            name="streetAndNumber"
            type="text"
            value={formData.streetAndNumber}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Postal Code"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Locality"
            name="locality"
            type="text"
            value={formData.locality}
            onChange={handleInputChange}
          />
          <FormField
            label="City / Town"
            name="cityOrTown"
            type="text"
            value={formData.cityOrTown}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Tax Identification Number (TIN)"
            name="tin"
            type="text"
            value={formData.tin}
            onChange={handleInputChange}
          />
        </section>
        <section className="grid grid-cols-3 gap-4">
          <FormField
            label="Client's Full Name / Business Name"
            name="clientFullName"
            type="text"
            value={formData.clientFullName}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Client's Address"
            name="clientAddress"
            type="text"
            value={formData.clientAddress}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Client's Postal Code"
            name="clientPostalCode"
            type="text"
            value={formData.clientPostalCode}
            onChange={handleInputChange}
          />
          <FormField
            label="Client's Locality"
            name="clientLocality"
            type="text"
            value={formData.clientLocality}
            onChange={handleInputChange}
          />
          <FormField
            label="Client's City / Town"
            name="clientCityOrTown"
            type="text"
            value={formData.clientCityOrTown}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Client's Country"
            name="clientCountry"
            type="text"
            value={formData.clientCountry}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Client's Tax Identification Number (TIN)"
            name="clientTin"
            type="text"
            value={formData.clientTin}
            onChange={handleInputChange}
          />
        </section>
        <section className="grid grid-cols-2 gap-4">
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
          />
        </section>
        <section className="grid gap-4">
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
                />
                <FormField
                  label={`Quantity`}
                  name={`services[${index}].quantity`}
                  type="number"
                  value={service.quantity}
                  onChange={handleInputChange}
                  required
                />
                <FormField
                  label={`Rate Per Unit`}
                  name={`services[${index}].ratePerUnit`}
                  type="number"
                  value={service.ratePerUnit}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  onClick={() => removeService(index)}
                  label="X"
                />
              </div>
              <div>
                <div>Total Amount: {service.totalAmount.toFixed(2)}</div>
              </div>
            </div>
          ))}
          <Button type="button" onClick={addService} label="Add Service" />
        </section>
        <section className="grid grid-cols-3 gap-4">
          <FormTextarea
            label="Payment Terms"
            name="paymentTerms"
            value={formData.paymentTerms}
            onChange={handleInputChange}
            rows={4}
          />
          <FormTextarea
            label="Bank Account Details"
            name="bankAccountDetails"
            value={formData.bankAccountDetails}
            onChange={handleInputChange}
            rows={4}
          />
          <FormTextarea
            label="Payment Instructions"
            name="paymentInstructions"
            value={formData.paymentInstructions}
            onChange={handleInputChange}
            rows={4}
            placeholder="Additional Payment Instructions or Terms"
          />
        </section>
        <section className="grid grid-cols-2 gap-4">
          <FormTextarea
            label="Terms and Conditions"
            name="termsAndConditions"
            value={formData.termsAndConditions}
            onChange={handleInputChange}
            rows={4}
            placeholder="Terms and Conditions (e.g., late payment fees, refund policies, confidentiality agreements)"
          />
          <div>
            <FormField
              label="VAT (Value Added Tax)"
              name="vat"
              type="number"
              value={formData.vat}
              onChange={handleInputChange}
            />
            <FormField
              label="Shipping Fees"
              name="shippingFees"
              type="number"
              value={formData.shippingFees}
              onChange={handleInputChange}
            />
          </div>
        </section>
        <Button type="submit" label="Generate PDF" />
      </form>
      {pdfEmbed && pdfDataUri && (
        <iframe
          src={pdfDataUri}
          title="Generated PDF"
          width="100%"
          height="500px"
        />
      )}
    </main>
  );
};
