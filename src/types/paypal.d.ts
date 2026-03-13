
declare global {
  interface Window {
    paypal: {
      HostedButtons: (options: { hostedButtonId: string; }) => {
        render: (selector: string) => void;
      };
      Buttons: (options: any) => {
        render: (selector: string) => void;
      };
    };
  }
}

export {};
