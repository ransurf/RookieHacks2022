export const NewRequestSchema = [
    {
      label: "clinic",
      required: true,
      requiredOptions: {
        maxLength: 20
      },
      props: {
        name: "clinic",
        type: "text",
        placeholder: "Enter where you received the prescription"
      }
    },
    {
        label: "doctor",
        required: true,
        requiredOptions: {
          maxLength: 20
        },
        props: {
          name: "doctor",
          type: "text",
          placeholder: "Enter your doctor's name"
        }
      },
  ];
  