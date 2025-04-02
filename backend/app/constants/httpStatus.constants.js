export const HttpStatus = {
  INVALID_REQUEST: { statusCode: 400, code: "InvalidRequest" },
  INTERNAL_SERVER_ERROR: { statusCode: 500, code: "InternalServerError" },
  BAD_GATEWAY: { statusCode: 502, code: "BadGateway" },
  SERVICE_UNAVAILABLE: { statusCode: 503, code: "ServiceUnavailable" },
  GATEWAY_TIMEOUT: { statusCode: 504, code: "GatewayTimeout" },
  SUCCESS: { statusCode: 200, code: "Success" },
  CREATED: { statusCode: 201, code: "Created" },
};
