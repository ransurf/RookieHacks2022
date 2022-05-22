export const PharmacyCreateSchema = [
    {
        label: "Pharmacy Name",
        required: true,
        requiredOptions: {
          maxLength: 20
        },
        props: {
          name: "name",
          type: "text",
          placeholder: "Name of your pharmacy"
        }
      },
      {
        label: "Phone Number",
        required: true,
        props: {
          name: "phoneNumber",
          type: "number",
          placeholder: "institution phone number"
        }
      },
      {
          label: "email",
          required: true,
          props: {
            name: "contact_email",
            type: "text",
            placeholder: "contact email"
    }
    },
    {
        label: "description",
        required: true,
        props: {
          name: "description",
          type: "description",
          placeholder: "about the pharmacy"
        }
  },
];