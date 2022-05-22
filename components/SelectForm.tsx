import React, { useEffect, useState } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';

interface Props {
  label: string;
  options: Array<{ value: string; name: string }>;
  onChange: (value: string) => void;
}

const SelectForm = ({ label, options, onChange }) => {
  const [value, setValue] = useState('');
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    console.log(options)
  }, [options])


  return (
    // <div className="mb-4">
    //     <label className="text-gray-600">{label}</label>
    //     <select
    //         className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    //         value={value}
    //         onChange={handleChange}
    //     >
    //         {options.map((option, index) => (
    //             <option key={index} value={option.value}>
    //                 {option.label}
    //             </option>
    //         ))}
    //     </select>
    // </div>
    <>
    <p>{label}</p>
    <IonSelect id="category" name="group" onIonChange={(e) => handleChange(e)}>
      {options.map((item, index) => (
        <IonSelectOption key={index} value={item.value}>
          {item.name}
        </IonSelectOption>
      ))}
    </IonSelect>
    </>
    
  );
};

export default SelectForm
