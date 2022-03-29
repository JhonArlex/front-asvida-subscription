import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreditCardAction = {
  acceptance_token: Scalars['String'];
  amount: Scalars['Float'];
  card_holder: Scalars['String'];
  cvc: Scalars['String'];
  email: Scalars['String'];
  exp_month: Scalars['String'];
  exp_year: Scalars['String'];
  fee: Scalars['String'];
  number: Scalars['String'];
  period: Scalars['Float'];
  subscription: Scalars['String'];
  user: Scalars['String'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRole: Role;
  createSubscription: Subscription;
  createUser: User;
  createUserSubscription: UserSubscription;
  deletePayment: Payment;
  deletePermission: Permission;
  deleteRole: Role;
  deleteSubscription: Subscription;
  deleteUser: User;
  deleteUserSubscription: UserSubscription;
  facebookLogin: User;
  googleLogin: User;
  login: User;
  payCard: Transaction;
  payNequi: Transaction;
  recovery: Recovery;
  refresh: User;
  register: User;
  updateRole: Role;
  updateSubscription: Subscription;
  updateUser: User;
  updateUserSubscription: UserSubscription;
};


export type MutationCreateRoleArgs = {
  input: RoleAction;
};


export type MutationCreateSubscriptionArgs = {
  input: SubscriptionAction;
};


export type MutationCreateUserArgs = {
  input: UserAction;
};


export type MutationCreateUserSubscriptionArgs = {
  input: UserSubscriptionAction;
};


export type MutationDeletePaymentArgs = {
  id: Scalars['String'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSubscriptionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserSubscriptionArgs = {
  id: Scalars['String'];
};


export type MutationFacebookLoginArgs = {
  token: Scalars['String'];
};


export type MutationGoogleLoginArgs = {
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPayCardArgs = {
  input: CreditCardAction;
};


export type MutationPayNequiArgs = {
  input: NequiAction;
};


export type MutationRecoveryArgs = {
  email: Scalars['String'];
};


export type MutationRefreshArgs = {
  refresh_token: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateRoleArgs = {
  input: RoleActionUpdate;
};


export type MutationUpdateSubscriptionArgs = {
  input: SubscriptionActionUpdate;
};


export type MutationUpdateUserArgs = {
  input: UserActionUpdate;
};


export type MutationUpdateUserSubscriptionArgs = {
  input: UserSubscriptionActionUpdate;
};

export type NequiAction = {
  acceptance_token: Scalars['String'];
  amount: Scalars['Float'];
  email: Scalars['String'];
  period: Scalars['Float'];
  phone_number: Scalars['String'];
  subscription: Scalars['String'];
  user: Scalars['String'];
};

export type Payment = {
  __typename?: 'Payment';
  description: Scalars['String'];
  id: Scalars['String'];
  method: Scalars['String'];
  paymentName: Scalars['String'];
  paymentSource: Scalars['String'];
  state: Scalars['String'];
  user: Scalars['String'];
};

export type PaymentConditions = {
  user: Scalars['String'];
};

export type Permission = {
  __typename?: 'Permission';
  code: Scalars['String'];
  id: Scalars['String'];
};

export type PermissionInputQuery = {
  code?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getPayment: Array<Payment>;
  getPayments: Payment;
  getPermission: Array<Permission>;
  getPermissions: Array<Permission>;
  getRoles: Array<Role>;
  getSubscription: Subscription;
  getSubscriptions: Array<Subscription>;
  getTokenAcceptace: TokenAcceptance;
  getTransaction: Transaction;
  getTransactions: Array<Transaction>;
  getUserSubscription: UserSubscription;
  getUserSubscriptionCondition: UserSubscription;
  getUserSubscriptions: Array<UserSubscription>;
  getUsers: Array<User>;
};


export type QueryGetPaymentArgs = {
  input: PaymentConditions;
};


export type QueryGetPaymentsArgs = {
  id: Scalars['String'];
};


export type QueryGetPermissionArgs = {
  input: PermissionInputQuery;
};


export type QueryGetSubscriptionArgs = {
  id: Scalars['String'];
};


export type QueryGetSubscriptionsArgs = {
  input: SubscriptionConditions;
};


export type QueryGetTransactionArgs = {
  id: Scalars['String'];
};


export type QueryGetTransactionsArgs = {
  input: TransactionConditions;
};


export type QueryGetUserSubscriptionArgs = {
  id: Scalars['String'];
};


export type QueryGetUserSubscriptionConditionArgs = {
  input: UserSubscriptionConditions;
};


export type QueryGetUserSubscriptionsArgs = {
  input: UserSubscriptionConditions;
};


export type QueryGetUsersArgs = {
  input: UserQueryInput;
};

export type Recovery = {
  __typename?: 'Recovery';
  send: Scalars['Boolean'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['String'];
  name: Scalars['String'];
  permissions: Array<Permission>;
};

export type RoleAction = {
  permissions: Array<Scalars['String']>;
};

export type RoleActionUpdate = {
  data: RoleAction;
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  benefits: Array<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
  state: Scalars['String'];
  time: Scalars['Float'];
};

export type SubscriptionAction = {
  benefits: Array<Scalars['String']>;
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
  state: Scalars['String'];
  time: Scalars['Float'];
};

export type SubscriptionActionUpdate = {
  data: SubscriptionActionUpdateData;
  id: Scalars['String'];
};

export type SubscriptionActionUpdateData = {
  benefits: Array<Scalars['String']>;
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
  state: Scalars['String'];
  time: Scalars['Float'];
};

export type SubscriptionConditions = {
  state?: InputMaybe<Scalars['String']>;
};

export type TokenAcceptance = {
  __typename?: 'TokenAcceptance';
  acceptance_token: Scalars['String'];
  permalink: Scalars['String'];
  type: Scalars['String'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount_in_cents: Scalars['Float'];
  bill_id?: Maybe<Scalars['String']>;
  billing_data?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  currency: Scalars['String'];
  customer_data?: Maybe<Scalars['String']>;
  customer_email: Scalars['String'];
  finalized_at?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  idTransaction: Scalars['String'];
  payment_link_id?: Maybe<Scalars['String']>;
  payment_method: Scalars['String'];
  payment_method_type: Scalars['String'];
  payment_source_id?: Maybe<Scalars['String']>;
  redirect_url?: Maybe<Scalars['String']>;
  reference: Scalars['String'];
  shipping_address?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  status_message?: Maybe<Scalars['String']>;
  taxes?: Maybe<Scalars['String']>;
};

export type TransactionConditions = {
  idTransaction?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  access_token?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  dni?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  phone: Array<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  role: Array<Role>;
  stratum?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  typeLivingPlace?: Maybe<Scalars['String']>;
};

export type UserAction = {
  address?: InputMaybe<Scalars['String']>;
  authorizationAssistService?: InputMaybe<Scalars['Boolean']>;
  authorizationContractService?: InputMaybe<Scalars['Boolean']>;
  authorizationFacture?: InputMaybe<Scalars['Boolean']>;
  authorizationHabeasData?: InputMaybe<Scalars['Boolean']>;
  city?: InputMaybe<Scalars['String']>;
  dateSignature?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  dni?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  expeditionPlace?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  neighborhood?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Array<Scalars['String']>>;
  stratum?: InputMaybe<Scalars['String']>;
  typeDni?: InputMaybe<Scalars['String']>;
  typeLivingPlace?: InputMaybe<Scalars['String']>;
};

export type UserActionUpdate = {
  data: UserAction;
  id: Scalars['String'];
};

export type UserQueryInput = {
  _id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type UserSubscription = {
  __typename?: 'UserSubscription';
  createdAt: Scalars['DateTime'];
  expiration: Scalars['DateTime'];
  id: Scalars['String'];
  state: Scalars['String'];
  subscription: Subscription;
  transaction: Array<Transaction>;
  user: User;
};

export type UserSubscriptionAction = {
  expiration: Scalars['DateTime'];
  period: Scalars['Float'];
  state: Scalars['String'];
  subscription: Scalars['String'];
  transaction: Scalars['String'];
  user: Scalars['String'];
};

export type UserSubscriptionActionUpdate = {
  data: UserSubscriptionActionUpdateData;
  id: Scalars['String'];
};

export type UserSubscriptionActionUpdateData = {
  expiration: Scalars['DateTime'];
  state: Scalars['String'];
  subscription: Scalars['String'];
  transaction: Scalars['String'];
  user: Scalars['String'];
};

export type UserSubscriptionConditions = {
  dni?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  limit: Scalars['Float'];
  page: Scalars['Float'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  transaction?: InputMaybe<Scalars['String']>;
};

export type GetTokenAcceptanceQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokenAcceptanceQueryQuery = { __typename?: 'Query', getTokenAcceptace: { __typename?: 'TokenAcceptance', acceptance_token: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, access_token?: string | null, refresh_token?: string | null } };

export type TransactionFragmentFragment = { __typename?: 'Transaction', id: string, created_at: string, amount_in_cents: number, reference: string, customer_email: string, currency: string, payment_method_type: string, payment_method: string, status: string, status_message?: string | null, billing_data?: string | null, shipping_address?: string | null, redirect_url?: string | null, payment_source_id?: string | null, payment_link_id?: string | null, customer_data?: string | null, bill_id?: string | null, idTransaction: string };

export type PayNequiMutationVariables = Exact<{
  input: NequiAction;
}>;


export type PayNequiMutation = { __typename?: 'Mutation', payNequi: { __typename?: 'Transaction', id: string, created_at: string, amount_in_cents: number, reference: string, customer_email: string, currency: string, payment_method_type: string, payment_method: string, status: string, status_message?: string | null, billing_data?: string | null, shipping_address?: string | null, redirect_url?: string | null, payment_source_id?: string | null, payment_link_id?: string | null, customer_data?: string | null, bill_id?: string | null, idTransaction: string } };

export type PayCardMutationVariables = Exact<{
  input: CreditCardAction;
}>;


export type PayCardMutation = { __typename?: 'Mutation', payCard: { __typename?: 'Transaction', id: string, created_at: string, amount_in_cents: number, reference: string, customer_email: string, currency: string, payment_method_type: string, payment_method: string, status: string, status_message?: string | null, billing_data?: string | null, shipping_address?: string | null, redirect_url?: string | null, payment_source_id?: string | null, payment_link_id?: string | null, customer_data?: string | null, bill_id?: string | null, idTransaction: string } };

export type SubscriptionFramentFragment = { __typename?: 'Subscription', id: string, price: string, benefits: Array<string>, name: string, time: number, state: string, description: string };

export type Get_SubscriptionsQueryVariables = Exact<{
  input: SubscriptionConditions;
}>;


export type Get_SubscriptionsQuery = { __typename?: 'Query', getSubscriptions: Array<{ __typename?: 'Subscription', id: string, price: string, benefits: Array<string>, name: string, time: number, state: string, description: string }> };

export type CreateUserMutationVariables = Exact<{
  input: UserAction;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string, phone: Array<string>, token?: string | null, description?: string | null, createdAt: string, city?: string | null, access_token?: string | null, refresh_token?: string | null, role: Array<{ __typename?: 'Role', name: string }> } };

export type UserFragmentFragment = { __typename?: 'User', id: string, name: string, email: string, phone: Array<string>, description?: string | null, createdAt: string, city?: string | null, address?: string | null, dni?: string | null, typeLivingPlace?: string | null, stratum?: string | null, role: Array<{ __typename?: 'Role', name: string }> };

export type UserSubscriptionFragmentFragment = { __typename?: 'UserSubscription', id: string, expiration: any, state: string, createdAt: any, user: { __typename?: 'User', id: string, name: string, email: string, phone: Array<string>, description?: string | null, createdAt: string, city?: string | null, address?: string | null, dni?: string | null, typeLivingPlace?: string | null, stratum?: string | null, role: Array<{ __typename?: 'Role', name: string }> }, subscription: { __typename?: 'Subscription', id: string, price: string, benefits: Array<string>, name: string, time: number, state: string, description: string }, transaction: Array<{ __typename?: 'Transaction', id: string, created_at: string, amount_in_cents: number, reference: string, customer_email: string, currency: string, payment_method_type: string, payment_method: string, status: string, status_message?: string | null, billing_data?: string | null, shipping_address?: string | null, redirect_url?: string | null, payment_source_id?: string | null, payment_link_id?: string | null, customer_data?: string | null, bill_id?: string | null, idTransaction: string }> };

export type GetUserSubscriptionsQueryVariables = Exact<{
  input: UserSubscriptionConditions;
}>;


export type GetUserSubscriptionsQuery = { __typename?: 'Query', getUserSubscriptionCondition: { __typename?: 'UserSubscription', id: string, expiration: any, state: string, createdAt: any, user: { __typename?: 'User', id: string, name: string, email: string, phone: Array<string>, description?: string | null, createdAt: string, city?: string | null, address?: string | null, dni?: string | null, typeLivingPlace?: string | null, stratum?: string | null, role: Array<{ __typename?: 'Role', name: string }> }, subscription: { __typename?: 'Subscription', id: string, price: string, benefits: Array<string>, name: string, time: number, state: string, description: string }, transaction: Array<{ __typename?: 'Transaction', id: string, created_at: string, amount_in_cents: number, reference: string, customer_email: string, currency: string, payment_method_type: string, payment_method: string, status: string, status_message?: string | null, billing_data?: string | null, shipping_address?: string | null, redirect_url?: string | null, payment_source_id?: string | null, payment_link_id?: string | null, customer_data?: string | null, bill_id?: string | null, idTransaction: string }> } };

export type GetUsersSubscriptionQueryVariables = Exact<{
  input: UserSubscriptionConditions;
}>;


export type GetUsersSubscriptionQuery = { __typename?: 'Query', getUserSubscriptions: Array<{ __typename?: 'UserSubscription', id: string, expiration: any, state: string, createdAt: any, user: { __typename?: 'User', id: string, name: string, email: string, phone: Array<string>, description?: string | null, createdAt: string, city?: string | null, address?: string | null, dni?: string | null, typeLivingPlace?: string | null, stratum?: string | null, role: Array<{ __typename?: 'Role', name: string }> }, subscription: { __typename?: 'Subscription', id: string, price: string, benefits: Array<string>, name: string, time: number, state: string, description: string }, transaction: Array<{ __typename?: 'Transaction', id: string, created_at: string, amount_in_cents: number, reference: string, customer_email: string, currency: string, payment_method_type: string, payment_method: string, status: string, status_message?: string | null, billing_data?: string | null, shipping_address?: string | null, redirect_url?: string | null, payment_source_id?: string | null, payment_link_id?: string | null, customer_data?: string | null, bill_id?: string | null, idTransaction: string }> }> };

export type GetUserSubscriptionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserSubscriptionQuery = { __typename?: 'Query', getUserSubscription: { __typename?: 'UserSubscription', id: string, expiration: any, state: string, createdAt: any, user: { __typename?: 'User', id: string, name: string, email: string, phone: Array<string>, description?: string | null, createdAt: string, city?: string | null, address?: string | null, dni?: string | null, typeLivingPlace?: string | null, stratum?: string | null, role: Array<{ __typename?: 'Role', name: string }> }, subscription: { __typename?: 'Subscription', id: string, price: string, benefits: Array<string>, name: string, time: number, state: string, description: string }, transaction: Array<{ __typename?: 'Transaction', id: string, created_at: string, amount_in_cents: number, reference: string, customer_email: string, currency: string, payment_method_type: string, payment_method: string, status: string, status_message?: string | null, billing_data?: string | null, shipping_address?: string | null, redirect_url?: string | null, payment_source_id?: string | null, payment_link_id?: string | null, customer_data?: string | null, bill_id?: string | null, idTransaction: string }> } };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  email
  phone
  role {
    name
  }
  description
  createdAt
  city
  address
  dni
  typeLivingPlace
  stratum
}
    `;
export const SubscriptionFramentFragmentDoc = gql`
    fragment SubscriptionFrament on Subscription {
  id
  price
  benefits
  name
  time
  state
  description
}
    `;
export const TransactionFragmentFragmentDoc = gql`
    fragment TransactionFragment on Transaction {
  id
  created_at
  amount_in_cents
  reference
  customer_email
  currency
  payment_method_type
  payment_method
  status
  status_message
  billing_data
  shipping_address
  redirect_url
  payment_source_id
  payment_link_id
  customer_data
  bill_id
  idTransaction
}
    `;
export const UserSubscriptionFragmentFragmentDoc = gql`
    fragment UserSubscriptionFragment on UserSubscription {
  id
  user {
    ...UserFragment
  }
  subscription {
    ...SubscriptionFrament
  }
  expiration
  state
  transaction {
    ...TransactionFragment
  }
  createdAt
}
    ${UserFragmentFragmentDoc}
${SubscriptionFramentFragmentDoc}
${TransactionFragmentFragmentDoc}`;
export const GetTokenAcceptanceQueryDocument = gql`
    query GetTokenAcceptanceQuery {
  getTokenAcceptace {
    acceptance_token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTokenAcceptanceQueryGQL extends Apollo.Query<GetTokenAcceptanceQueryQuery, GetTokenAcceptanceQueryQueryVariables> {
    override document = GetTokenAcceptanceQueryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    id
    access_token
    refresh_token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    override document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PayNequiDocument = gql`
    mutation payNequi($input: NequiAction!) {
  payNequi(input: $input) {
    ...TransactionFragment
  }
}
    ${TransactionFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PayNequiGQL extends Apollo.Mutation<PayNequiMutation, PayNequiMutationVariables> {
    override document = PayNequiDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PayCardDocument = gql`
    mutation payCard($input: CreditCardAction!) {
  payCard(input: $input) {
    ...TransactionFragment
  }
}
    ${TransactionFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class PayCardGQL extends Apollo.Mutation<PayCardMutation, PayCardMutationVariables> {
    override document = PayCardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const Get_SubscriptionsDocument = gql`
    query get_subscriptions($input: SubscriptionConditions!) {
  getSubscriptions(input: $input) {
    ...SubscriptionFrament
  }
}
    ${SubscriptionFramentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class Get_SubscriptionsGQL extends Apollo.Query<Get_SubscriptionsQuery, Get_SubscriptionsQueryVariables> {
    override document = Get_SubscriptionsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation createUser($input: UserAction!) {
  createUser(input: $input) {
    id
    name
    email
    phone
    role {
      name
    }
    token
    description
    createdAt
    city
    access_token
    refresh_token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    override document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserSubscriptionsDocument = gql`
    query getUserSubscriptions($input: UserSubscriptionConditions!) {
  getUserSubscriptionCondition(input: $input) {
    ...UserSubscriptionFragment
  }
}
    ${UserSubscriptionFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserSubscriptionsGQL extends Apollo.Query<GetUserSubscriptionsQuery, GetUserSubscriptionsQueryVariables> {
    override document = GetUserSubscriptionsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUsersSubscriptionDocument = gql`
    query getUsersSubscription($input: UserSubscriptionConditions!) {
  getUserSubscriptions(input: $input) {
    ...UserSubscriptionFragment
  }
}
    ${UserSubscriptionFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUsersSubscriptionGQL extends Apollo.Query<GetUsersSubscriptionQuery, GetUsersSubscriptionQueryVariables> {
    override document = GetUsersSubscriptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserSubscriptionDocument = gql`
    query getUserSubscription($id: String!) {
  getUserSubscription(id: $id) {
    ...UserSubscriptionFragment
  }
}
    ${UserSubscriptionFragmentFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserSubscriptionGQL extends Apollo.Query<GetUserSubscriptionQuery, GetUserSubscriptionQueryVariables> {
    override document = GetUserSubscriptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }