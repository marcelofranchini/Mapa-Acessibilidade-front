export type Provider = {
  isValid: boolean;
  authenticated: boolean;
  identification: string;
  providerId: string;
  fromHolder: boolean;
  convenioId: number;
  icon: {
    name: string;
    width: number;
    height: number;
  };
  title: string;
  subtitle: string;
};

export type AvailableNewProvider = {
  icon: {
    name: string;
    width: number;
    height: number;
  };
  _id: string;
  subtitle: string;
  active: boolean;
  title: string;
  newProviderRoute: string;
  providerId: string;
  convenioId: number;
};

export type GetProvidersResponse = {
  message: string;
  provedores: [
    {
      icon: {
        name: string;
        width: number;
        height: number;
      };
      _id: string;
      subtitle: string;
      active: boolean;
      title: string;
      fromHolder: boolean;
      providerId: string;
      newProviderRoute: string;
      convenioId: number;
    },
  ];
};

export type RemoveProviderPayload = {
  providerId: string;
  identification: string;
  changeToSelectionScreen?: boolean;
};

export type RegisterProviderRequest = {
  providerId: string;
  identification: string;
};

export type RegisterProviderResponse = {
  message: string;
  validated: boolean;
  provider: {
    authenticated: boolean;
    identification: string;
    providerId: string;
    convenioId: number;
    icon: {
      name: string;
      width: number;
      height: number;
    };
    title: string;
    subtitle: string;
  };
};
export type MessageResponse = {
  message: string;
  validated: boolean;
};

export type ValidateTokenRequest = {
  providerId: string;
  identification: string;
  token: number;
};


export type PointsResponse = {
  _id: string;
  coord: {
    lat: string;
    long: string;
  }
  description: string;
  userId: string;
  image: string;
  title: string;
  createdAt: string;
  updateAt: string;
  providerId: string;
  identification: string;
  token: number;
};
