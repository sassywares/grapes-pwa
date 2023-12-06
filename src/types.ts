/**
 * @file Type definitions
 */

export type Theme = "light" | "dark" | "system";

/**
 * An HTML string with tags and elements.
 */
export type HTML = string;

/**
 * A binary value representing a boolean.
 */
export type NumericBoolean = 0 | 1;

export type Payload<Data, Type> = {
  data: Data;
} & (Type extends "array"
  ? {
      type: "array";
      length: number;
    }
  : {
      type: "object";
    });

export type ResponseErrors = {
  message: string;
  [key: string]: string;
} | null;

export type Response<Payload> = {
  status: number;
  payload: Payload;
  errors?: ResponseErrors;
};

export type Boolbacks<Data> = {
  onSuccess?: (data: Data) => void;
  onError?: (errors: ResponseErrors) => void;
};

export type StateBox<Payload> = {
  payload?: Payload;
  errors?: ResponseErrors;
  status: "idle" | "loading" | "success" | "error";
};
