import React, {useState} from 'react';
import NotificationAlert from '../../components/NotificationAlert';

interface PropsLayout {
  children: React.ReactNode;
}
const Layout = ({children}: PropsLayout) => {
  const [isMessage, setIsMessage] = useState<any>({
    messageTitle: '',
    messageBody: '',
    active: false,
  });

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
