export interface Notification {
  message: string;
  type: 'success' | 'error';
}

export interface Locality {
  __typename: string;
  postcode: number;
  state: string;
}
