export const PharmacistSignUpSchema = [
    {
      label: "First Name",
      required: true,
      requiredOptions: {
        maxLength: 20
      },
      props: {
        name: "firstName",
        type: "text",
        placeholder: "Enter a first name"
      }
    },
    {
      label: "Last Name",
      required: true,
      requiredOptions: {
        maxLength: 20
      },
      props: {
        name: "lastName",
        type: "text",
        placeholder: "Enter a last name"
      }
    },
    {
      label: "Phone Number",
      required: true,
      props: {
        name: "phoneNumber",
        type: "number",
        placeholder: "Enter a phone number"
      }
    },
    {
        label: "Email",
        required: false,
        props: {
          name: "contact_email",
          type: "text",
          placeholder: "Enter your email"
        }
      },
  ];
  