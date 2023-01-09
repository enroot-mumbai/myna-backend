import Validator from "validatorjs";

interface CustomError {
  property: string;
  msg: string;
}

export function validator(
  body: { [key: string]: any },
  rules: { [key: string]: any },
  allowExtraFields = false,
  customMessages: { [key: string]: any },
  callback: (errors: { [key: string]: any }, success: boolean) => void
) {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => {
    let customErrorArrays: CustomError[] = checkForExtraFields(body, rules, allowExtraFields);
    if (customErrorArrays.length !== 0) {
      addCustomValidationErrors(validation.errors, customErrorArrays);
      callback(validation.errors, false);
    }
    callback({}, true);
  });
  validation.fails(() => {
    let errors: CustomError[] = checkForExtraFields(body, rules, allowExtraFields);
    if (errors.length !== 0) {
      addCustomValidationErrors(validation.errors, errors);
    }
    callback(validation.errors, false);
  });
}

function checkForExtraFields(
  body: { [key: string]: any },
  rules: { [key: string]: any },
  allowExtraFields: boolean
): CustomError[] {
  if (allowExtraFields) {
    return [];
  }
  let ruleBasedProperties: string[] = Object.keys(rules);
  for (let index = 0; index < ruleBasedProperties.length; index++) {
    if (ruleBasedProperties[index].includes(".*.")) {
      ruleBasedProperties[index] = ruleBasedProperties[index].split(".*.")[0];
    }
  }

  let errorsArray: CustomError[] = [];
  Object.keys(typeof body === "undefined" ? {} : body).forEach((property) => {
    if (!ruleBasedProperties.includes(property)) {
      errorsArray.push({ property: property, msg: "Extra Field" });
    }
  });

  return errorsArray;
}

function addCustomValidationErrors(errors: { [key: string]: any }, customErrorsArray: CustomError[]) {
  customErrorsArray.forEach((customError) => {
    errors.add(customError.property, customError.msg);
  });

  return errors;
}

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}