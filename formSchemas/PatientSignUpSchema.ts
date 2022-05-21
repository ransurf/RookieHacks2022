export const PatientSignUpSchema = [
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
    label: "Age",
    required: true,
    requiredOptions: {
      min: 1,
      max: 150
    },
    props: {
      name: "age",
      type: "number",
      inputmode: "numeric",
      placeholder: "Enter your age"
    }
  },
  {
    label: "Address",
    required: true,
    props: {
      name: "address",
      type: "text",
      placeholder: "Enter an address"
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
  }
];
