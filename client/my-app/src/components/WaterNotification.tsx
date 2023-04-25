import {useState, useEffect, useCallback} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { onMessageListener } from '../firebase';
import { MessagePayload } from 'firebase/messaging';

interface IWaterNotif {
  title: string | null,
  body: string | null,
}

const initialMsgState = {
  title: '',
  body: ''
}
const WaterNotification = () => {
  const [notification, setNotification] = useState<IWaterNotif>(initialMsgState);

  const notify = useCallback(() => {
    
    function ToastDisplay() {
      return (
        <div>
          <p><b>{notification?.title}</b></p>
          <p>{notification?.body}</p>
        </div>
      );
    };

    toast(<ToastDisplay />);

  }, [notification])



  useEffect(() => {
    const handleMessage = (payload: MessagePayload) => {
      if (payload?.notification) {
        setNotification({
          title: payload.notification.title ?? '',
          body: payload.notification.body ?? ''
        })
      }
    }

    onMessageListener().then((payload) => handleMessage(payload)).catch((err) => console.log('failed: ', err))

    if (notification?.title) {
      notify();
    }

  }, [notification, notify]);


  return (
    <Toaster />
  )
}

export default WaterNotification