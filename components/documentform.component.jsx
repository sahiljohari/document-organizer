import { useForm } from "react-hook-form";
import { documentTypes } from "../utils/constants";
import FormInput from "./common/forminput.component";
import ValidationMessage from "./common/validationmessage.component";

const DocumentForm = ({
  formTitle,
  formValues,
  handleSaveDocument,
  resetForm,
  processing,
}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: formValues,
  });
  return (
    <>
      <h2 className="uppercase text-2xl mb-4">{formTitle}</h2>
      <form
        onSubmit={handleSubmit(handleSaveDocument)}
        className="flex flex-col mt-2 justify-center w-full"
      >
        <FormInput
          classNames="mb-6 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          label="Name"
          name="documentName"
          placeholder="Ex. Passport, Drivers License, etc."
          ref={register({ required: true, maxLength: 50, minLength: 2 })}
        />
        {errors.documentName && errors.documentName.type === "required" && (
          <ValidationMessage>This field is required</ValidationMessage>
        )}
        {errors.documentName && errors.documentName.type === "minLength" && (
          <ValidationMessage>
            Name should have minimum 2 characters
          </ValidationMessage>
        )}
        {errors.documentName && errors.documentName.type === "maxLength" && (
          <ValidationMessage>
            Name cannot exceed 50 characters
          </ValidationMessage>
        )}

        <label>Type</label>
        <select
          className="mb-6 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          name="documentType"
          ref={register}
        >
          {Object.entries(documentTypes).map(([key, value]) => (
            <option key={key} value={key}>
              {value.icon}
              {value.displayText}
            </option>
          ))}
        </select>

        <FormInput
          classNames="mb-6 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          label="Date of Expiry"
          name="documentEndDate"
          type="date"
          ref={register({ required: true })}
        />
        {errors.documentEndDate &&
          errors.documentEndDate.type === "required" && (
            <ValidationMessage>This field is required</ValidationMessage>
          )}

        <div className="flex flex-row w-1/2 mx-auto justify-center">
          <input
            type="submit"
            value={processing ? "Saving..." : "Save"}
            disabled={processing}
            className="w-24 flex items-center justify-center mt-4 mx-4 rounded-md border border-gray-300 px-3 py-2 bg-gray-800 text-white hover:bg-white hover:text-gray-800 hover:border-gray-800 duration-200"
          />
          <input
            type="button"
            value="Cancel"
            className="w-24 flex items-center justify-center mt-4 mx-4 rounded-md border border-gray-300 px-3 py-2 bg-white hover:bg-gray-800 hover:text-white duration-200"
            onClick={resetForm}
          />
        </div>
      </form>
    </>
  );
};

export default DocumentForm;
