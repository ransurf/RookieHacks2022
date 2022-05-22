import React from 'react'
import Link from 'next/link'
import { IonButton } from '@ionic/react';
import Router from 'next/router';
interface Props {
  view?: string;
}

const TabSwitcher = (props: Props) => {
  const { view } = props;
  return (
    <div className="text-white flex gap-8 justify-center mb-4">
        <IonButton onClick={() => Router.push(`/${view}/requests`)}>
            Requests
        </IonButton>
        <IonButton onClick={() => Router.push('/profile')}>
          Profile
        </IonButton>
    </div>
  )
}

export default TabSwitcher