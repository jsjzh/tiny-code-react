/// <reference types="vite/client" />

declare namespace T {
  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: { lat: string; lng: string };
    };
    company: { name: string; catchPhrase: string; bs: string };
  }
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
}
