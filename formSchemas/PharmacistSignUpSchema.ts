export const PharmacistSignUpSchema = [
    {
      label: "Title",
      required: true,
      requiredOptions: {
        maxLength: 50
      },
      props: {
        name: "title",
        type: "text",
        placeholder: "Enter the title of your pharmacy"
      }
    },
    {
        label: "Description",
        required: false,
        equiredOptions: {
            maxLength: 300
          },
        props: {
          name: "description",
          type: "text",
          placeholder: "Enter a short description of your pharmacy"
        }
      },
    {
      label: "Address",
      required: true,
      props: {
        name: "address",
        type: "text",
        placeholder: "Enter your pharmacy's location"
      }
    },
    {
        label: "ZIP Code",
        required: true,
        props: {
          name: "zipcode",
          type: "text",
          placeholder: "Enter your pharmacy's zipcode"
        }
      },
    {
        label: "Working Hours",
        required: false,
        equiredOptions: {
            maxLength: 100
          },
        props: {
          name: "workingHours",
          type: "text",
          placeholder: "Describe your working hours"
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
          name: "email",
          type: "text",
          placeholder: "Enter your email"
        }
      },
  ];
  