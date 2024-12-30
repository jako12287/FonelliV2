import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {setRefetch} from '../../redux/slices/refecthRealTime';
import {useDispatch} from 'react-redux';
import NotificationAlert from '../../components/NotificationAlert';

interface PropsLayout {
  children: React.ReactNode;
}
const Layout = ({children}: PropsLayout) => {
  const dispatch = useDispatch();

  const [isMessage, setIsMessage] = useState<any>({
    messageTitle: '',
    messageBody: '',
    active: false,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('Foreground message:', remoteMessage);
        setIsMessage({
          messageTitle:
            remoteMessage.notification?.title ||
            '¡Tienes una nueva notificación!',
          messageBody:
            remoteMessage.notification?.body ||
            'Mensaje sin contenido adicional.',
          active: true,
        });

        dispatch(setRefetch(true));
      });
      return unsubscribe;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isMessage?.active ? (
        <NotificationAlert isMessage={isMessage} setIsMessage={setIsMessage} />
      ) : null}
      {children}
    </>
  );
};

export default Layout;
