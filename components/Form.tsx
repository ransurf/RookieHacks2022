import { IonButton, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { useForm } from "react-hook-form";
import { alertCircleOutline } from "ionicons/icons";
//pass in the schema and the onSubmit function from the higher order component page
// fields also contains validation parameters
const Form = ({ fields, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange"
  });
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-4">
      {fields.map((field, index) => {
        const { label, required, requiredOptions, props } = field;
        return (
          <IonItem key={`form_field_${index}`} lines="full">
            <>
              <IonLabel position="stacked">{label}</IonLabel>
              <IonInput
                {...props}
                {...register(props.name, { required, ...requiredOptions })}
              />
            </>
            {required &&
              errors[props.name] && (
                <IonIcon icon={alertCircleOutline} color="danger" />
              )}
          </IonItem>
        );
      })}

      <IonButton
        type="submit"
        className="ion-margin-top"
        expand="full"
        disabled={!isDirty || !isValid}
      >
        Submit
      </IonButton>
    </form>
  );
};
export default Form;
