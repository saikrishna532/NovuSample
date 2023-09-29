import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
  } from "@novu/notification-center";
  
  function NovuBell({}) {
    return (
      <NovuProvider
        subscriberId={process.env.REACT_APP_SUBSCRIBER_ID}
        applicationIdentifier={process.env.REACT_APP_NOVU_IDENTIFIER}
      >
        <PopoverNotificationCenter>
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider>
    );
  }
  
  export default NovuBell;