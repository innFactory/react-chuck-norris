export const ValidationMessages = {
  REQUIRED: (): string => "This field is required",
  NOT_A_EMAIL: (): string => "Please enter a valid email address",
  NOT_A_NUMBER: (): string => "Please enter a valid number",
  NOT_A_MONEY: (): string => "Please enter a valid amount of money",
  NOT_A_URL: (): string => "Please enter a valid URL",
  NOT_A_VALID_PASSWORD: (): string =>
    "The password has to be at least 10 characters long and contain at least one uppercase letter, one lowercase letter and one number.",
  NOT_MATCHING_PASSWORD: (): string => "The passwords do not match",
};
