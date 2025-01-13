import { CustomError } from "@errors/custom-error";
import { HttpStatusCode } from "@errors/httpStatusCodeEnum";

export class VarEnvValidationError extends CustomError {
  constructor(value: any, type: string) {
    super(
      `Env variable validation error. Value '${value}' cannot be converted to type '${type}'`,
      HttpStatusCode.INTERNAL_SERVER,
      "ENV_VARIABLE_VALIDATION"
    );
  }
}
