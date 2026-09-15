import { isInputError, type ActionError } from 'astro:actions';

/** One sentence a page can show for a failed Action: field messages first, else the error. */
export function actionMessage(error: ActionError): string {
  if (isInputError(error)) {
    return Object.values(error.fields).flat().join(' ');
  }
  return error.message;
}
